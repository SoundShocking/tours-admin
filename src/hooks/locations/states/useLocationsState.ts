import { getLocationsState } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useLocationsState = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: state, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getLocationsState(+id),
    queryKey: ['locations-state', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, state }
}
