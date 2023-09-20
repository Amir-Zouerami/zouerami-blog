function Event({
  year,
  title,
  text,
}: {
  year: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="my-5 text-center">
      <span className="text-lg font-bold text-amber-400">{year}: </span>
      <span>{title}</span>
      <p className="text-justify leading-relaxed opacity-[.6]">{text}</p>
    </div>
  );
}

export default Event;
