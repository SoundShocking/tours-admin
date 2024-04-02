import { getCurrency } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useCurrency = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: currency, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getCurrency(+id),
    queryKey: ['currency', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { currency, isFetching }
}
