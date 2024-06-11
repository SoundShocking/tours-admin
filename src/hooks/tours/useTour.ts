import { getTour } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useTour = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: tour, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getTour(+id),
    queryKey: ['tour', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, tour }
}
