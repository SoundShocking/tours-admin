import { getStatus } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useStatus = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: status, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getStatus(+id),
    queryKey: ['status', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, status }
}
