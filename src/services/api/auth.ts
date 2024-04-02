import instance from '@/services/api/instance'
import { IMe } from '@/types'

export const getMe = () => {
  return instance.get<IMe>('/me')
}

export const authorize = (form: any) => {
  return instance.post('/authorize', form)
}
