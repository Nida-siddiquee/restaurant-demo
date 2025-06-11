import React from "react"
import { PageButton, Wrapper } from "./Pagination.styled"


type Props = {
  totalPages: number
  currentPage: number
  setCurrentPage: (p: number) => void
}

const Pagination: React.FC<Props> = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null

  const getPageList = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 4) pages.push("...")

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)

      if (currentPage < totalPages - 3) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <Wrapper>
      <PageButton
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PageButton>

      {getPageList().map((item, idx) =>
        typeof item === "number" ? (
          <PageButton
            key={item}
            $active={item === currentPage}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </PageButton>
        ) : (
          <span key={`ellipsis-${idx}`} style={{ padding: "0.5rem 0.75rem", color: "#888" }}>
            ...
          </span>
        )
      )}

      <PageButton
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PageButton>
    </Wrapper>
  )
}

export default Pagination
