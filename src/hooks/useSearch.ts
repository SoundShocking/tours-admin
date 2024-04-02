import { useDebounceValue } from 'usehooks-ts'

export const useSearch = () => {
  // const searchDebounced = useDebounce(search, 300)
  const [debouncedSearch, setSearch] = useDebounceValue('', 500)

  return { debouncedSearch, setSearch }
}
