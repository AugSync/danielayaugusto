import Image from 'next/image';

import Arrow from '@/icons/Arrow';
import flowerOne from '@/public/assets/images/flower-1.png';
import flowerTwo from '@/public/assets/images/flower-2.png';
import wifeImg from '@/public/assets/images/wife.jpg';

const WeddingLanding = () => {
  return (
    <div className="md:flex">
      <div className="relative w-full md:w-3/5">
        <Image
          src={wifeImg}
          alt="Picture of the author"
          width={1920}
          height={1080}
          className="h-screen w-full object-cover object-top"
        />
        <div className="absolute bottom-0 h-3/5 w-full items-center bg-gradient-to-t from-black to-transparent p-10">
          <p
            className={
              'mt-36 w-4/5 font-parisienne text-4xl text-white md:mt-32 md:text-4xl lg:mt-20 lg:text-5xl xl:mt-10 xl:text-6xl'
            }
          >
            Augusto <br></br> & Daniela
          </p>

          <p
            className={'w-4/5 font-cormorant text-xl font-light text-white lg:text-3xl xl:text-4xl'}
          >
            Queremos compartir contigo este momento especial
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
          La Mata, Arenales
        </p>
        <p className={'w-5/6 font-arimaMadurai text-base font-thin xl:text-xl'}>
          Sábado, Febrero 26, 2023
        </p>
        <p className={'w-5/6 font-arimaMadurai text-base font-normal xl:text-xl'}>
          24 días, 14 horas, 36 minutos, 78 segundos
        </p>

        <div className="my-10 w-4/6 bg-augdi" style={{ height: 1 }}></div>

        <p className={'w-3/6 font-arimaMadurai text-base font-thin xl:text-xl'}>
          <span className="font-bold text-augdi">Yusmila</span>, queremos que esté con nosotros en
          nuestra boda. Sin ti, no sería lo mismo.
        </p>

        <button className="mt-4 w-4/6 rounded-lg bg-augdi py-2 px-4 font-arimaMadurai text-sm font-bold text-white hover:bg-cyan-800 xl:text-base">
          Confirme asistencia
        </button>

        <button className="mt-10 flex flex-col items-center justify-center font-arimaMadurai text-sm font-black xl:text-base">
          Ver detalles de la invitación
          <Arrow />
        </button>

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
