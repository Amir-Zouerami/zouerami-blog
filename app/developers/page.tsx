import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ابزار هایی برای توسعه دهندگان وب',
  description: 'Tools for web developers by Amir Zouerami',
};

function page() {
  return (
    <section className="container mx-auto max-w-[1200px]">
      <h1 className="my-10 text-center text-4xl font-black leading-loose">
        ابزار های{' '}
        <span className="bg-gradient-to-l from-[#E975A8] to-[#726CF8] bg-clip-text text-transparent">
          توسعه دهندگان
        </span>
      </h1>

      <div className="flex items-center justify-center">
        <div>
          <p className="font-black">این بخش در حال راه اندازی است ...</p>
        </div>
      </div>
    </section>
  );
}

export default page;
