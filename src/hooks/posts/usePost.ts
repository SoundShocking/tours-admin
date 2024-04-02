import { getPost } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const usePost = (id: string) => {
  const { contentLanguage } = useSettingsStore()

  const { data: post, isFetching } = useQuery({
    gcTime: 0,
    queryFn: () => getPost(+id),
    queryKey: ['post', { id, lang: contentLanguage }],
    refetchOnMount: 'always',
    select: response => response.data.data,
    staleTime: 0,
  })

  return { isFetching, post }
}
