import { updatePost } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdatePost = (id: string) => {
  const client = useQueryClient()

  const { isPending: isUpdating, mutate: updatePostMutate } = useMutation({
    mutationFn: (form: any) => updatePost(+id, form),
    mutationKey: ['update-post'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['post'] })
      client.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return { isUpdating, updatePostMutate }
}
