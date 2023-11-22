function Loading() {
  return (
    <div className="mx-auto mt-20 max-w-[95%] lg:max-w-[1200px]">
      <div className="relative mx-auto max-w-[900px]">
        <div className="shimmer-light dark:shimmer-dark h-[170px] w-[350px] rounded-3xl lg:h-[450px] lg:w-[900px]"></div>

        <div className="mt-20">
          <div className="shimmer-light dark:shimmer-dark inline-block h-[35px] w-[350px] rounded-3xl lg:h-[35px] lg:w-[400px]"></div>

          <div className="my-10 flex flex-col items-center justify-between lg:mx-40 lg:flex-row">
            <div className="">
              <div className="shimmer-light dark:shimmer-dark my-2 inline-block h-[20px] w-[350px] rounded-3xl lg:h-[35px] lg:w-[400px]"></div>
              <div className="shimmer-light dark:shimmer-dark my-2 inline-block h-[20px] w-[350px] rounded-3xl lg:h-[35px] lg:w-[400px]"></div>
              <div className="shimmer-light dark:shimmer-dark my-2 inline-block h-[20px] w-[200px] rounded-3xl lg:!hidden lg:h-[35px] lg:w-[400px]"></div>
              <div className="shimmer-light dark:shimmer-dark my-2 inline-block h-[20px] w-[200px] rounded-3xl lg:!hidden lg:h-[35px] lg:w-[400px]"></div>
            </div>

            <div className="mt-5 lg:m-0">
              <div className="shimmer-light dark:shimmer-dark my-2 inline-block h-[50px] w-[170px] rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[95%] text-justify leading-[3]  2xl:text-lg 2xl:leading-10">
        <div className="shimmer-light dark:shimmer-dark h-[50px] w-[250px] rounded-3xl lg:h-[50px] lg:w-[500px]"></div>
        <div className="shimmer-light dark:shimmer-dark h-[500px] w-[300px] rounded-3xl lg:h-[500px] lg:w-[900px]"></div>
      </div>
    </div>
  );
}

export default Loading;
