import { deleteMandatory } from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteMandatory = () => {
  const client = useQueryClient()

  const { isPending: isDeleting, mutateAsync: deleteMandatoryMutateAsync } = useMutation({
    mutationFn: (id: number) => deleteMandatory(id),
    mutationKey: ['delete-mandatory'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['mandatories'] })
    },
  })

  return { deleteMandatoryMutateAsync, isDeleting }
}
