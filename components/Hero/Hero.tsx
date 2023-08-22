import heroImage from '@/public/Amir Zouerami Light(1.5).png';
import amirHero from '@/public/small-blog-landing-page-me-min.png';
import Image from 'next/image';

const Hero = () => {
  return (
    <Image
    // TODO: Use an svg image to increase quality or change logo alltogether.
      src={heroImage}
      className="flex-2 max-w-2/3 my-10 min-w-[30%]"
      alt="hero section image"
    />
  );
};

export default Hero;
