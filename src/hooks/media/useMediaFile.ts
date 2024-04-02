import { getMediaFile } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const useMediaFile = (id: null | number) => {
  const { contentLanguage } = useSettingsStore()

  const {
    data: file,
    isFetching,
    isSuccess,
  } = useQuery({
    enabled: !!id,
    gcTime: 0,
    queryFn: () => getMediaFile(id!),
    queryKey: ['media-file', { id, lang: contentLanguage }],
    select: response => response.data.data,
    staleTime: 0,
  })

  return { file, isFetching, isSuccess }
}
