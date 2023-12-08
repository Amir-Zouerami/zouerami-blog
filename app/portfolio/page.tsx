import Project from '@/components/Project Showcase/Project';
import { PROJECT } from '@/utility/types';
import { Metadata } from 'next';
import Pocketbase from 'pocketbase';

export const metadata: Metadata = {
  title: 'پورتفولیو',
  description: 'Portfolio of Amir Zouerami',
};

async function page() {
  let projects;
  try {
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
    projects = await pb
      .collection('projects')
      .getFullList<PROJECT>({ filter: 'featured = true' });
  } catch (error) {}

  return (
    <section className="container mx-auto max-w-[1000px]">
      <div className="my-10 flex flex-col items-center justify-center gap-5 px-5 leading-9">
        <h1 className="text-3xl font-black">پورتفولیو</h1>
        <p>
          در این بخش می تونید پروژه های اصلی من رو مشاهده کنید. تمام پروژه های
          لیست شده در این بخش اوپن سورس هستن و به گیت هاب لینک دارن.
        </p>
      </div>

      {projects === undefined ? (
        <div className="my-20 text-center text-lg font-bold">
          <p>متاسفانه خطایی در دریافت داده ها رخ داده است.</p>
        </div>
      ) : (
        projects.map(project => <Project key={project.id} project={project} />)
      )}
    </section>
  );
}

export default page;
