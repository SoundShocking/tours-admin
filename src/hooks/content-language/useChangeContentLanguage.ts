import { changeContentLanguage } from '@/services/api'
import { useSettingsStore } from '@/store'
import { useMutation } from '@tanstack/react-query'

export const useChangeContentLanguage = () => {
  const { setContentLanguage } = useSettingsStore()

  const { isPending: isChanging, mutate: changeContentLanguageMutate } = useMutation({
    mutationFn: (lang: string) => changeContentLanguage(lang),
    mutationKey: ['change-content-language'],
    onSuccess: response => {
      setContentLanguage(response.data)
    },
  })

  return { changeContentLanguageMutate, isChanging }
}
