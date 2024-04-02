import { getLocationsContinent } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useLocationsContinent = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: continent, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getLocationsContinent(+id),
    queryKey: ['locations-continent', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { continent, isFetching }
}
