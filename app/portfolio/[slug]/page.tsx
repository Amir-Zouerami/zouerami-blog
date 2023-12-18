import { PROJECT } from '@/utility/types';
import { createFileURL } from '@/utility/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Pocketbase from 'pocketbase';
import { parseOptions } from '@/utility/html-react-parser';
import parse from 'html-react-parser';

interface SingleProjectParam {
  params: { slug: string };
}

const getProject = async (postSlug: string) => {
  let post: PROJECT;

  try {
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    post = await pb
      .collection('projects')
      .getFirstListItem<PROJECT>(
        pb.filter('slug = {:slug}', { slug: postSlug }),
        {
          skipTotal: true,
        }
      );

    return post;
  } catch (error) {
    console.log('cached getProject func failed', error);
    throw new Error('cached getProject func failed');
  }
};

export async function generateMetadata({
  params,
}: SingleProjectParam): Promise<Metadata> {
  let project: PROJECT = await getProject(params.slug);

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [createFileURL(project.id, project.collectionId, project.cover)],
      url: `/portfolio/${project.slug}`,
      type: 'article',
      locale: 'fa_IR',
      authors: 'امیر زوارمی',
    },
  };
}

export async function generateStaticParams() {
  let allProjects: PROJECT[];

  try {
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    allProjects = await pb.collection('projects').getFullList<PROJECT>({
      filter: 'featured = true',
      cache: 'no-store',
    });

    return allProjects.map(project => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.log('generateStaticParams func failed', error);
    throw new Error('cached getPosts func failed');
  }
}

async function page({ params }: SingleProjectParam) {
  const { slug } = params;
  let project: PROJECT = await getProject(slug);
  const parsedHTML = parse(project.content, parseOptions);

  return (
    <div className="mx-auto mt-20 max-w-[95%] lg:max-w-[1200px]">
      <div className="mx-auto max-h-[500px] max-w-[900px]">
        <Image
          src={createFileURL(project.id, project.collectionId, project.cover)}
          width={0}
          height={0}
          sizes="100%"
          alt={project.title}
          className="mb-10 h-full w-full rounded-3xl"
        />
      </div>

      <div className="mx-10 mt-10 lg:mt-20">
        <h1 className="text-4xl font-black lg:text-5xl">{project.title}</h1>
      </div>

      <div className="mx-auto max-w-[95%] text-justify leading-[3] 2xl:text-lg 2xl:leading-10">
        {parsedHTML}
      </div>
    </div>
  );
}

export default page;
