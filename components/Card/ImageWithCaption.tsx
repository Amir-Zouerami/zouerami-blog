import Image from 'next/image';

function ImageWithCaption({
  src,
  caption,
  w,
}: {
  src: string;
  caption: string;
  w: number;
}) {
  return (
    <div>
      <Image src={src} width={w} alt={caption} />
      <span>{caption}</span>
    </div>
  );
}

export default ImageWithCaption;
