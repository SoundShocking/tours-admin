import { getGroup } from '@/services/api/groups'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useGroup = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: group, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getGroup(+id),
    queryKey: ['group', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { group, isFetching }
}
