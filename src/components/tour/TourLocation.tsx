import { FC, useEffect } from 'react'

import { useLocationsCities, useLocationsCountries } from '@/hooks'
import { Button, Form, FormListFieldData, FormListOperation, Select } from 'antd'
import { FaTrash } from 'react-icons/fa6'

import styles from './TourLocation.module.scss'

interface Props {
  field: FormListFieldData
  remove: FormListOperation['remove']
}

export const TourLocation: FC<Props> = ({ field, remove }) => {
  const form = Form.useFormInstance()
  const location = Form.useWatch<{ cityId: null | number; countryId: null | number }>(
    ['locations', field.name],
    form
  )

  const { countries, isFetching: isCountriesFetching } = useLocationsCountries(
    1,
    'all',
    '',
    'name',
    'asc'
  )

  const { cities, isFetching: isCitiesFetching } = useLocationsCities(
    1,
    'all',
    '',
    'name',
    'asc',
    location?.countryId
  )

  const countriesOptions = (countries?.data || []).map(country => ({
    label: country.name,
    value: country.id,
  }))

  const citiesOptions = (cities?.data || []).map(city => ({
    label: city.name,
    value: city.id,
  }))

  useEffect(() => {
    if (location?.cityId && cities) {
      const city = cities?.data.find(city => city.id === location.cityId)

      if (!city) {
        form.setFieldValue(['locations', field.name, 'cityId'], null)
      }
    }
  }, [location, cities, field, form])

  const onDelete = () => {
    remove(field.name)
  }

  return (
    <div className={styles.location}>
      <Form.Item
        label={'Country'}
        name={[field.name, 'countryId']}
        rules={[{ message: 'Please choose country', required: true }]}
      >
        <Select
          disabled={isCountriesFetching}
          loading={isCountriesFetching}
          options={countriesOptions}
          placeholder={'Choose Country'}
        />
      </Form.Item>

      <Form.Item
        label={'City'}
        name={[field.name, 'cityId']}
        rules={[{ message: 'Please choose city', required: true }]}
      >
        <Select
          disabled={isCitiesFetching}
          loading={isCitiesFetching}
          options={citiesOptions}
          placeholder={'Choose City'}
        />
      </Form.Item>

      <Button danger onClick={onDelete} shape={'circle'} type={'primary'}>
        <FaTrash />
      </Button>
    </div>
  )
}
