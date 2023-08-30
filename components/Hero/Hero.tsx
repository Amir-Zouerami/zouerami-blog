import heroImage from '@/public/hero-image.svg';
import Image from 'next/image';

const Hero = () => {
  return (
    <Image
      src={heroImage}
      className="mt-10 max-w-[50%] dark:invert md:col-span-5 lg:max-w-[70%]"
      alt="hero section image"
    />
  );
};

export default Hero;
