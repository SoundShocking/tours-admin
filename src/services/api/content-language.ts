import instance from '@/services/api/instance'

export const getContentLanguage = () => {
  return instance.get<string>('current-language')
}

export const changeContentLanguage = (language: string) => {
  return instance.post<string>(`/lang-switcher`, {
    language,
  })
}
