function Loading() {
  return (
    <div className="container mx-auto flex max-w-[1200px] flex-col items-center">
      <div className="shimmer-light dark:shimmer-dark my-10 h-[80px] w-[80%] rounded-3xl lg:h-[70px] lg:w-[300px]"></div>
      <div className="mb-5 mt-8 self-start lg:mt-20">
        <div className="shimmer-light dark:shimmer-dark h-[20px] w-[150px] rounded-3xl"></div>
      </div>

      <div className="mb-20 flex w-full flex-col justify-between lg:flex-row">
        <div className="shimmer-light dark:shimmer-dark my-5 inline-block h-[60px] max-w-full rounded-3xl lg:my-0 lg:mr-10 lg:w-[500px]"></div>
        <div className="shimmer-light dark:shimmer-dark my-5 inline-block h-[60px] max-w-full rounded-3xl lg:my-0 lg:ml-10 lg:w-[500px]"></div>
      </div>

      <div className="shimmer-light dark:shimmer-dark mx-auto mb-16 grid h-[610px] w-[350px] max-w-[97%] rounded-3xl lg:h-[330px] lg:w-[1000px] lg:grid-cols-12"></div>
      <div className="shimmer-light dark:shimmer-dark mx-auto mb-16 grid h-[610px] w-[350px] max-w-[97%] rounded-3xl lg:h-[330px] lg:w-[1000px] lg:grid-cols-12"></div>
      <div className="shimmer-light dark:shimmer-dark mx-auto mb-16 grid h-[610px] w-[350px] max-w-[97%] rounded-3xl lg:h-[330px] lg:w-[1000px] lg:grid-cols-12"></div>
      <div className="shimmer-light dark:shimmer-dark mx-auto mb-16 grid h-[610px] w-[350px] max-w-[97%] rounded-3xl lg:h-[330px] lg:w-[1000px] lg:grid-cols-12"></div>
    </div>
  );
}

export default Loading;
