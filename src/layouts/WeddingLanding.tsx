/* eslint-disable jsx-a11y/alt-text */
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { Image as DatoImage } from 'react-datocms';
import useSWR from 'swr';

import { useCountdown } from '@/hooks/useCountdown';
import Arrow from '@/icons/Arrow';
import flowerOne from '@/public/assets/images/flower-1.png';
import flowerTwo from '@/public/assets/images/flower-2.png';
import type { TWeddingGuest, TWeddingLanding } from '@/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const WeddingLanding = ({
  landing,
  guest,
  setIsOpenedSchedule,
}: {
  landing: TWeddingLanding;
  guest?: TWeddingGuest;
  setIsOpenedSchedule?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: guestRealtimeData } = useSWR(`/api/get-guest/${guest?.id}`, fetcher);

  const [showInputCode, setShowInputCode] = useState(false);
  const [invitationCode, setInvitationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [days, hours, minutes, seconds] = useCountdown(landing.date);

  const [isInvited, setIsInvited] = useState(guest?.attending);

  const router = useRouter();

  const handleConfirmCode = async ({ code, id }: { code: string; id?: string }) => {
    const data = {
      invitationCode: code,
      id,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = '/api/update-guest';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();

    if (response.ok) {
      setIsInvited(true);
    } else {
      setErrorMessage(result.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (invitationCode.length === 4) {
      setLoading(true);
      setErrorMessage('');

      handleConfirmCode({ code: invitationCode, id: guest?.id });
    }
  }, [invitationCode]);

  useEffect(() => {
    setIsInvited(guestRealtimeData?.guest?.attending);
  }, [guestRealtimeData?.guest?.attending]);

  return (
    <div className="md:flex">
      <div className="relative w-full bg-cardboard md:w-3/5">
        <DatoImage
          data={{
            ...landing.photo.responsiveImage,
            alt: `Wedding photo`,
          }}
          className="static h-screen w-full"
          pictureClassName="object-cover object-center h-screen w-full"
          placeholderClassName="w-full left-0 right-0 h-screen"
        />
        <div className="absolute bottom-0 h-3/5 w-full items-center bg-gradient-to-t from-black to-transparent p-10">
          <div
            className={
              'mt-36 w-4/5 font-parisienne text-4xl text-white md:mt-32 md:text-4xl lg:mt-20 lg:text-5xl xl:mt-10 xl:text-6xl'
            }
            dangerouslySetInnerHTML={{ __html: landing.weddingName }}
          />

          <p
            className={'w-4/5 font-cormorant text-xl font-light text-white lg:text-3xl xl:text-4xl'}
          >
            {landing.weddingPhrase}
          </p>
        </div>

        <Image
          src={flowerOne}
          alt="Picture of the author"
          width={200}
          height={200}
          className="absolute top-0 w-2/6 object-cover"
        />
      </div>
      <div className="relative flex h-screen w-full flex-col items-center justify-center bg-cardboard text-center md:w-2/5">
        <p className={'mt-20 w-5/6 font-parisienne text-3xl text-augdi xl:mt-36 xl:text-5xl'}>
          {landing.locality}
        </p>
        <p className={'w-5/6 font-arimaMadurai text-base font-thin xl:text-xl'}>
          {format(new Date(landing.date), 'EEEE, PPP', { locale: es })}
        </p>
        <p className={'w-5/6 font-arimaMadurai text-base font-normal xl:text-xl'}>
          {`${days} ${days === 1 ? 'día' : 'días'}, ${hours} ${
            hours === 1 ? 'hora' : 'horas'
          }, ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}, ${seconds} ${
            seconds === 1 ? 'segundo' : 'segundos'
          }`}
        </p>

        {guest ? (
          <>
            <div className="my-10 w-4/6 bg-augdi" style={{ height: 1 }}></div>

            <p className={'w-3/6 font-arimaMadurai text-base font-thin xl:text-xl'}>
              <span className="font-bold text-augdi">{guest.name}</span>
              {guest.invitation}
            </p>

            {showInputCode && !isInvited ? (
              <>
                <input
                  className={`mt-4 w-4/6 rounded-lg border-2 ${
                    errorMessage ? 'border-red-700 text-red-700' : 'border-augdi text-augdi'
                  } py-2 px-4 text-center font-arimaMadurai text-sm font-bold  outline-0  xl:text-base`}
                  placeholder={landing.confirmationPlaceHolder}
                  onChange={(e) => setInvitationCode(e.target.value)}
                  maxLength={4}
                  disabled={loading}
                ></input>
                {errorMessage ? <p className="mt-1 text-xs text-red-700">{errorMessage}</p> : null}
              </>
            ) : (
              <button
                onClick={() => {
                  setShowInputCode(true);
                }}
                className={`mt-4 w-4/6 rounded-lg bg-augdi py-2 px-4 font-arimaMadurai text-sm font-bold text-white ${
                  isInvited ? '' : 'hover:bg-cyan-800'
                } xl:text-base`}
                disabled={isInvited || !guestRealtimeData}
              >
                {isInvited ? landing.attendingText : landing.confirmationText}
              </button>
            )}

            <button
              onClick={() => {
                setIsOpenedSchedule?.(true);
                router.push('#schedule');
              }}
              className="mt-10 flex flex-col items-center justify-center font-arimaMadurai text-sm font-black xl:text-base"
            >
              {landing.detailsText}
              <Arrow />
            </button>
          </>
        ) : null}

        <Image
          src={flowerTwo}
          alt="Picture of the author"
          width={400}
          height={400}
          className="absolute top-0 right-0 w-3/6 object-cover md:w-5/6"
        />
      </div>
    </div>
  );
};

export default WeddingLanding;
