export const revalidate = 1800;

import Image from 'next/image';
import GitHub from '@/icons/github.svg';
import Link from 'next/link';
import { PROJECT } from '@/utility/types';
import { createFileURL, truncateSentence } from '@/utility/utils';

function Project({ project }: { project: PROJECT }) {
  return (
    <div className="mx-1 mb-20 flex flex-col items-center rounded-3xl bg-slate-100 dark:bg-[#424551] lg:flex-row">
      <div className="flex rounded-3xl lg:max-w-[400px]">
        <Image
          src={createFileURL(project.id, project.collectionId, project.cover)}
          width={400}
          height={300}
          alt={project.alt}
          className="rounded-3xl object-cover"
        />
      </div>

      <div className="flex-1 px-7 py-10 lg:px-10">
        <h2 className="mb-5 text-2xl font-black lg:text-3xl">
          {project.title}
        </h2>
        <p className="text-justify leading-8">
          {truncateSentence(project.summary, 60)}
        </p>

        <div className="mt-5 text-center">
          <div className="flex flex-wrap items-center justify-between gap-5 lg:justify-end">
            <Link
              href={project.technical_documentation}
              className="reactiveButton inline-block flex-1 rounded-[10px] bg-[#1f2124] px-4 py-4 text-white transition-all
              dark:bg-[#e25687] lg:flex-none"
            >
              توضیحات بیشتر
            </Link>

            <Link
              href={project.demo ?? ''}
              className="reactiveButton inline-block flex-1 rounded-[10px] bg-[#1f2124] px-4 py-4 text-white transition-all
              dark:bg-[#e25687] lg:flex-none"
            >
              دموی پروژه
            </Link>

            <Link
              href={project.github ?? ''}
              className="reactiveButton inline-block w-full rounded-[10px] bg-[#1f2124] bg-gradient-to-l from-[#5D4954] to-[#DC8B83] px-4
             py-3 text-white transition-all dark:from-[#a67fbe] dark:to-[#51b6af] lg:w-auto"
            >
              <Image
                src={GitHub}
                width={25}
                alt="Source code on GitHub"
                className="inline invert"
              />
              <span className=""> سورس کد</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
