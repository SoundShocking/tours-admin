import { getAccommodation } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useAccommodation = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: accommodation, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getAccommodation(+id),
    queryKey: ['accommodation', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { accommodation, isFetching }
}
