import { getFood } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useFood = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: food, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getFood(+id),
    queryKey: ['food', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { food, isFetching }
}
