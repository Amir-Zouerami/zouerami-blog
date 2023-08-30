function NewsLetter() {
  return (
    <div className="mx-auto flex justify-center">
      <input
        className="z-[2] ml-[-50px] rounded-full border-4 border-white dark:border-2
        bg-gradient-to-r from-[#28313B] to-[#485461] px-6 py-2 text-lg font-black text-white transition-all
      hover:scale-110 hover:cursor-pointer focus:outline-none dark:from-[#5ea38a] dark:to-[#beb262] lg:px-10 lg:py-3"
        type="submit"
        value="عضویت"
      />
      <input
        className="min-w-[80%] rounded-full bg-gradient-to-r from-[#5F4A55] to-[#DD8B84] pr-16 text-white
        placeholder-white placeholder:text-xs focus:outline-none dark:from-[#a67fbe] dark:to-[#51b6af]
        md:placeholder:text-base lg:min-w-[50%]"
        type="email"
        name=""
        id="joinNewsletter"
        placeholder="با عضویت در خبرنامه ی ایمیلی، آخرین مقالات را در ایمیل خود دریافت کنید"
      />
    </div>
  );
}

export default NewsLetter;
