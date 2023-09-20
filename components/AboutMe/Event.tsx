function Event({
  year,
  title,
  text,
}: {
  year: string;
  title: string;
  text: string;
}) {
  return (
    <div className="my-5 text-center">
      <div className="pb-3">
        <span className="text-lg font-bold text-amber-400">{year}: </span>
        <span dangerouslySetInnerHTML={{ __html: title }}></span>
      </div>
      <p
        className="text-justify leading-relaxed text-gray-400"
        dangerouslySetInnerHTML={{ __html: text }}
      ></p>
    </div>
  );
}

export default Event;
