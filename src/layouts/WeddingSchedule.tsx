import Image from 'next/image';

import flowerThree from '@/public/assets/images/flower-3.png';
import flowerFour from '@/public/assets/images/flower-4.png';
import type { TWeddingEvent, TWeddingGuest } from '@/types';

const WeddingSchedule = ({ events, guest }: { events: TWeddingEvent[]; guest: TWeddingGuest }) => {
  return (
    <div
      id="schedule"
      className="relative flex w-full flex-col items-center bg-cardboard text-center"
    >
      <p className={'mt-6 w-full font-parisienne text-3xl text-augdi lg:text-5xl'}>Cronograma</p>

      <div className="mt-10 mb-24 h-4/5 w-4/5 md:mb-10 md:w-3/5 lg:columns-2">
        {events
          .sort((a, b) => {
            return a.order - b.order;
          })
          .map(({ title, subtitle, description, idEvent }, index) =>
            guest[idEvent] ? (
              <article key={index} className={`mb-6 w-full text-left `}>
                <p className={'w-full font-parisienne text-2xl text-augdi lg:text-4xl'}>{title}</p>
                <p className={'w-full font-cormorant text-lg font-normal lg:text-xl'}>{subtitle}</p>

                <div
                  className={'mt-4 flex flex-col gap-4 font-arimaMadurai text-base font-thin'}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </article>
            ) : null
          )}
      </div>

      <Image
        src={flowerThree}
        alt="Picture of the author"
        width={400}
        height={400}
        className="absolute top-0 left-0 w-2/6 object-cover md:w-1/4"
      />

      <Image
        src={flowerFour}
        alt="Picture of the author"
        width={400}
        height={400}
        className="absolute bottom-0 right-0 w-2/5 object-cover md:w-1/5"
      />
    </div>
  );
};

export default WeddingSchedule;
