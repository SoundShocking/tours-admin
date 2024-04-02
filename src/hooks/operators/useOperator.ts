import { getOperator } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useOperator = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: operator, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getOperator(+id),
    queryKey: ['operator', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, operator }
}
