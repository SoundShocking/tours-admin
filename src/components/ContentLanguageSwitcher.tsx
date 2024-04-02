import { FC, useEffect, useState } from 'react'

import { useLanguages } from '@/hooks'
import { useChangeContentLanguage } from '@/hooks/content-language'
import { useSettingsStore } from '@/store'
import { Select } from 'antd'

export const ContentLanguageSwitcher: FC = () => {
  const { isFetching, languages } = useLanguages()
  const { changeContentLanguageMutate, isChanging } = useChangeContentLanguage()
  const [languageOptions, setLanguageOptions] = useState<{ label: string; value: string }[]>([])

  const { contentLanguage } = useSettingsStore()

  const onChange = (value: string) => {
    changeContentLanguageMutate(value)
  }

  useEffect(() => {
    if (languages) {
      setLanguageOptions(
        languages.data.map(lang => ({
          label: lang.name,
          value: lang.code,
        }))
      )
    }
  }, [languages])

  return (
    <Select
      disabled={isChanging}
      loading={isFetching}
      onChange={onChange}
      options={languageOptions}
      style={{ width: 100 }}
      value={contentLanguage}
    />
  )
}
