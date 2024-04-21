import { getService } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useService = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: service, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getService(+id),
    queryKey: ['service', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, service }
}
