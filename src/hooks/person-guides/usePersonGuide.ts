import { getPersonGuide } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const usePersonGuide = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: personGuide, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getPersonGuide(+id),
    queryKey: ['person-guide', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, personGuide }
}
