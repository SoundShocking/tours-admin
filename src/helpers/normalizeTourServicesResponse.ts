import { ITourServices } from '@/types'

export const normalizeTourServicesResponse = (services: ITourServices) => {
  const data: {
    accommodation?: {
      accommodations: { nights: null | number | undefined; type: number }[]
      description: string
      is_included: boolean
    }[]
    flights?: { description: string; is_included: boolean }[]
    guide?: { description: string; is_included: boolean }[]
    insurance?: { description: string; is_included: boolean }[]
    key: string
    meals?: { description: string; food_options: number[]; is_included: boolean }[]
    name: string
    optional?: { description: string; is_included: boolean }[]
    others?: { description: string; is_included: boolean }[]
    transport?: { description: string; is_included: boolean }[]
  }[] = []

  services.forEach(service => {
    switch (service.key) {
      case 'meals': {
        data.push({
          key: 'meals',
          meals: [
            {
              description: service.meals.descriptions?.[0].description || '',
              food_options: service.meals.food_options?.map(option => option.id) || [],
              is_included: Boolean(service.meals.descriptions?.[0].is_included) || false,
            },
          ],
          name: 'meals',
        })
        break
      }

      case 'accommodation': {
        data.push({
          accommodation: [
            {
              accommodations:
                service.accommodation.accommodation_types?.map(item => ({
                  nights: item.nights,
                  type: item.id,
                })) || [],
              description: service.accommodation.descriptions?.[0].description || '',
              is_included: Boolean(service.accommodation.descriptions?.[0].is_included) || false,
            },
          ],
          key: 'accommodation',
          name: 'accommodation',
        })
        break
      }

      case 'guide': {
        data.push({
          guide:
            service.guide?.descriptions?.map(item => ({
              description: item.description,
              is_included: Boolean(item.is_included),
            })) || [],
          key: 'guide',
          name: 'guide',
        })
        break
      }

      case 'others': {
        data.push({
          key: 'others',
          name: 'others',
          others:
            service.others?.descriptions?.map(item => ({
              description: item.description,
              is_included: Boolean(item.is_included),
            })) || [],
        })
        break
      }

      case 'flights': {
        data.push({
          flights:
            service.flights?.descriptions?.map(item => ({
              description: item.description,
              is_included: Boolean(item.is_included),
            })) || [],
          key: 'flights',
          name: 'flights',
        })
        break
      }

      case 'optional': {
        data.push({
          key: 'optional',
          name: 'optional',
          optional:
            service.optional?.descriptions?.map(item => ({
              description: item.description,
              is_included: Boolean(item.is_included),
            })) || [],
        })
        break
      }

      case 'insurance': {
        data.push({
          insurance:
            service.insurance?.descriptions?.map(item => ({
              description: item.description,
              is_included: Boolean(item.is_included),
            })) || [],
          key: 'insurance',
          name: 'insurance',
        })
        break
      }

      case 'transport': {
        data.push({
          key: 'transport',
          name: 'transport',
          transport: service.transport?.descriptions?.map(item => ({
            description: item.description,
            is_included: Boolean(item.is_included),
          })),
        })
        break
      }
    }
  })

  return data
}
