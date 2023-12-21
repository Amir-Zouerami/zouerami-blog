import Image from 'next/image';

function BlogPostImage({ href, caption }: { href: string; caption: string }) {
  return (
    <figure className="my-10 text-center">
      <Image
        src={href}
        alt={caption}
        width={600}
        height={600}
        // sizes="auto"
        className="mx-auto w-auto rounded-xl max-md:w-full"
      />
      <figcaption className="pt-3 text-sm text-slate-400 lg:text-base">
        {caption}
      </figcaption>
    </figure>
  );
}

export default BlogPostImage;
