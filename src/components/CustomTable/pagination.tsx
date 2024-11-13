/* eslint-disable import/no-unresolved */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

function TablePagination({
  limit,
  changePage,
  currentPage,
  total,
}: {
  limit: number;
  changePage: (_page: number) => void;
  currentPage: number;
  total: number;
}) {
  const totalPages = Math.ceil(total / limit);

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage > totalPages - 4) {
      pages.push(
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      );
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-between md:flex-row">
      <p className="mb-2 w-full text-center text-sm md:mb-0 md:w-[200px] ">
        Page {currentPage} of {totalPages}
      </p>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={cn(
                  currentPage === 1
                    ? 'pointer-events-none text-gray-300'
                    : 'text-primary-500 hover:text-primary-600',
                )}
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    changePage(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>
            {getPages().map((page, index) => {
              if (page === '...') {
                return (
                  <PaginationItem key={`${index + 1}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={`${index + 1}`}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      changePage(Number(page));
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                className={cn(
                  currentPage === totalPages
                    ? 'pointer-events-none text-gray-300'
                    : 'text-primary-500 hover:text-primary-600',
                )}
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    changePage(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default TablePagination;
