import { getPromotion } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const usePromotion = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: promotion, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getPromotion(+id),
    queryKey: ['promotion', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, promotion }
}
