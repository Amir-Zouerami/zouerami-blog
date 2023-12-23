import Image from 'next/image';

function BlogPostImage({
  href,
  caption,
  tall,
}: {
  href: string;
  caption: string;
  tall?: 'true';
}) {
  return (
    <figure className="my-10 text-center">
      {tall === 'true' ? (
        <Image
          src={href}
          alt={caption}
          width={600}
          height={600}
          className="mx-auto w-auto rounded-xl max-md:w-full"
        />
      ) : (
        <Image
          src={href}
          alt={caption}
          width={0}
          height={0}
          sizes="auto"
          className="mx-auto w-auto rounded-xl max-md:w-full"
        />
      )}
      <figcaption className="pt-3 text-sm text-slate-400 lg:text-base">
        {caption}
      </figcaption>
    </figure>
  );
}

export default BlogPostImage;
