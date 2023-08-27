function NewsLetter() {
  return (
    <div className="mx-auto flex justify-center">
      <input
        className="z-[2] ml-[-50px] rounded-full border-4 border-white
        bg-gradient-to-r from-[#28313B] to-[#485461] px-6 py-2 text-lg font-black text-white focus:outline-none lg:px-10 lg:py-3"
        type="submit"
        value="عضویت"
      />
      <input
        className="min-w-[80%] rounded-full bg-gradient-to-r from-[#5F4A55] to-[#DD8B84] pr-16
        text-white placeholder-white placeholder:text-xs focus:outline-none md:placeholder:text-base lg:min-w-[50%]"
        type="email"
        name=""
        id="joinNewsletter"
        placeholder="با عضویت در خبرنامه ی ایمیلی، آخرین مقالات را در ایمیل خود دریافت کنید"
      />
    </div>
  );
}

export default NewsLetter;
