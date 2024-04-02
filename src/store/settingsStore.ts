import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface SettingsStore {
  contentLanguage: string
  setContentLanguage: (lang: string) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    immer(set => ({
      contentLanguage: 'en',
      setContentLanguage: lang => {
        set(state => {
          state.contentLanguage = lang
        })
      },
    })),
    {
      name: 'zustand-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
