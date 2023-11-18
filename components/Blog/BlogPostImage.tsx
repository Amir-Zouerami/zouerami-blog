import Image from 'next/image';
import sampleImage from '@/public/sample-blog-image.jpg';

function BlogPostImage({ href, caption }: { href: string; caption: string }) {
  return (
    <figure className="my-10 text-center">
      <Image
        src={href}
        alt={caption}
        width={1200}
        height={1200}
        className="mx-auto max-w-full rounded-xl lg:max-w-[1000px]"
      />
      <figcaption className="pt-3 text-sm text-slate-400 lg:text-base">
        {caption}
      </figcaption>
    </figure>
  );
}

export default BlogPostImage;
