import React from 'react';
import { PageButton, Wrapper } from './Pagination.styled';
import { PaginationProps } from './types';

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const getPageList = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <Wrapper role="navigation" aria-label="Pagination Navigation">
      <PageButton
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        Previous
      </PageButton>

      {getPageList().map((item, idx) =>
        typeof item === 'number' ? (
          <PageButton
            key={item}
            $active={item === currentPage}
            onClick={() => setCurrentPage(item)}
            aria-current={item === currentPage ? 'page' : undefined}
            aria-label={`Go to page ${item}`}
          >
            {item}
          </PageButton>
        ) : (
          <span
            key={`ellipsis-${idx}`}
            style={{ padding: '0.5rem 0.75rem', color: '#888' }}
            aria-hidden="true"
          >
            ...
          </span>
        ),
      )}

      <PageButton
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        Next
      </PageButton>
    </Wrapper>
  );
};

export default Pagination;
