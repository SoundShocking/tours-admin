import { getAccommodationType } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useAccommodationType = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: accommodationType, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getAccommodationType(+id),
    queryKey: ['accommodation-type', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { accommodationType, isFetching }
}
