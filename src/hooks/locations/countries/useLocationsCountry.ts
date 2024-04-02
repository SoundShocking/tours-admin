import { getLocationsCountry } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useLocationsCountry = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: country, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getLocationsCountry(+id),
    queryKey: ['locations-country', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { country, isFetching }
}
