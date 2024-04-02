import { getLocationsCity } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useLocationsCity = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: city, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getLocationsCity(+id),
    queryKey: ['locations-city', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { city, isFetching }
}
