import { useState } from 'react'

export const usePagination = (initialPerPage = 20) => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(initialPerPage)

  const onPageChange = (page: number) => {
    setPage(page)
  }

  const onPageSizeChange = (_: number, size: number) => {
    setPage(1)
    setPerPage(size)
  }

  return { onPageChange, onPageSizeChange, page, perPage }
}
