import dayjs from 'dayjs'

export const getDateByFormat = (date: null | string | undefined, format = 'DD.MM.YYYY') => {
  if (!date) {
    return null
  }

  const dateInstance = dayjs(date)

  if (!dateInstance.isValid()) {
    return null
  }

  return dateInstance.format(format)
}
