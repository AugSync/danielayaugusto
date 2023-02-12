import { Cormorant, Parisienne } from '@next/font/google';
import Image from 'next/image';

import flowerOne from '@/public/assets/images/flower-1.png';
import flowerTwo from '@/public/assets/images/flower-2.png';
import wifeImg from '@/public/assets/images/wife.jpg';

const parisienne = Parisienne({ weight: '400', subsets: ['latin'] });
const cormorant = Cormorant({ weight: '300', subsets: ['latin'] });

const Index = () => {
  return (
    <div className="flex">
      <div className="relative w-3/5">
        <Image
          src={wifeImg}
          alt="Picture of the author"
          width={1920}
          height={1080}
          className="h-screen object-cover"
        />
        <div className="absolute bottom-0 h-3/5 w-full items-center bg-gradient-to-t from-black to-transparent p-10">
          <p className={`w-2/5 text-6xl text-white ${parisienne.className}`}>
            Augusto <br></br> & Daniela
          </p>

          <p className={`w-4/5 text-5xl text-white ${cormorant.className}`}>
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
      <div className="relative h-screen w-2/5 bg-cardboard">
        <Image
          src={flowerTwo}
          alt="Picture of the author"
          width={400}
          height={400}
          className="absolute top-0 right-0 w-5/6 object-cover"
        />
      </div>
    </div>
  );
};

export default Index;
