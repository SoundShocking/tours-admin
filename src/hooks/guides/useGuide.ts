import { getGuide } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useGuide = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: guide, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getGuide(+id),
    queryKey: ['guide', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { guide, isFetching }
}
