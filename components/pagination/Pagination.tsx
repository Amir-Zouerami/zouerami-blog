import Link from 'next/link';
import { PaginationProps } from '@/utility/types';

function Pagination({ page, totalPages }: PaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesDisplayed = 5;

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPagesDisplayed) {
      if (page - 2 > 0) startPage = page - 2;
      if (page + 2 < totalPages) endPage = page + 2;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.unshift(
        <Link
          href={i !== page ? `?page=${i}` : '#'}
          className={`${
            i === page ? 'pointer-events-none cursor-default' : ''
          }`}
          key={i}
        >
          <span
            className={`mx-1 rounded-3xl px-7 py-3 lg:mx-8 ${
              i === page ? 'bg-[#e25687]' : 'bg-[#6e7577] hover:bg-[#fb923c]'
            }`}
          >
            {i}
          </span>
        </Link>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center text-center font-black text-white">
      {renderPageNumbers()}
      {/* <Link href={'#'}>
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
      </Link> */}
    </div>
  );
}

export default Pagination;
