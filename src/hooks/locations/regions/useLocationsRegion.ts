import { getLocationsRegion } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useLocationsRegion = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: region, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getLocationsRegion(+id),
    queryKey: ['locations-region', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, region }
}
