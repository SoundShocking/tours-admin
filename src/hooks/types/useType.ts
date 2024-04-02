import { getType } from '@/services/api/types'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useType = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: type, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getType(+id),
    queryKey: ['type', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, type }
}
