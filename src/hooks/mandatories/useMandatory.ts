import { getMandatory } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useMandatory = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: mandatory, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getMandatory(+id),
    queryKey: ['mandatory', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, mandatory }
}
