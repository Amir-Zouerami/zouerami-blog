import Link from 'next/link';

function Pagination() {
  return (
    <div className="flex items-center justify-center text-center font-black text-white">
      <Link href={'#'}>
        <span className="mx-2 rounded-full bg-[#e25687] p-3 lg:mx-8">&lt;</span>
      </Link>

      <Link href={'#'}>
        <span className="mx-2 rounded-full bg-[#e25687] px-4 py-3 lg:mx-8">
          6
        </span>
      </Link>

      <Link href={'#'}>
        <span className="mx-2 rounded-2xl bg-[#e25687] px-5 py-3 lg:mx-8">
          5
        </span>
      </Link>

      <Link href={'#'}>
        <span className="mx-2 rounded-3xl bg-[#e25687] px-10 py-3 lg:mx-8">
          4
        </span>
      </Link>

      <Link href={'#'}>
        <span className="mx-2 rounded-2xl bg-[#e25687] px-5 py-3 lg:mx-8">
          3
        </span>
      </Link>

      <Link href={'#'}>
        <span className="mx-2 rounded-full bg-[#e25687] px-4 py-3 lg:mx-8">
          2
        </span>
      </Link>

      <Link href={'#'}>
        <span className="mx-2 rounded-full bg-[#e25687] p-3 lg:mx-8">&gt;</span>
      </Link>
    </div>
  );
}

export default Pagination;
