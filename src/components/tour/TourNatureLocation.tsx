import { FC, useEffect } from 'react'

import { useLocationsCountries, useLocationsRegions } from '@/hooks'
import { Button, Form, FormListFieldData, FormListOperation, Select } from 'antd'
import { FaTrash } from 'react-icons/fa6'

import styles from './TourLocation.module.scss'

interface Props {
  field: FormListFieldData
  remove: FormListOperation['remove']
}
export const TourNatureLocation: FC<Props> = ({ field, remove }) => {
  const form = Form.useFormInstance()
  const location = Form.useWatch<{ countryId: null | number; regionId: null | number }>(
    ['nature_locations', field.name],
    form
  )

  const { countries, isFetching: isCountriesFetching } = useLocationsCountries(
    1,
    'all',
    '',
    'name',
    'asc'
  )

  const { isFetching: isCitiesFetching, regions } = useLocationsRegions(
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

  const regionsOptions = (regions?.data || []).map(city => ({
    label: city.name,
    value: city.id,
  }))

  useEffect(() => {
    if (location?.regionId && regions) {
      const region = regions?.data.find(region => region.id === location.regionId)

      if (!region) {
        form.setFieldValue(['nature_locations', field.name, 'regionId'], null)
      }
    }
  }, [location, regions, field, form])

  const onDelete = () => {
    remove(field.name)
  }

  return (
    <div className={styles.location}>
      <Form.Item label={'Country'} name={[field.name, 'countryId']} rules={[{ required: true }]}>
        <Select
          disabled={isCountriesFetching}
          loading={isCountriesFetching}
          options={countriesOptions}
          placeholder={'Choose Country'}
        />
      </Form.Item>

      <Form.Item label={'Region'} name={[field.name, 'regionId']} rules={[{ required: true }]}>
        <Select
          disabled={isCitiesFetching}
          loading={isCitiesFetching}
          options={regionsOptions}
          placeholder={'Choose Region'}
        />
      </Form.Item>

      <Button danger onClick={onDelete} shape={'circle'} type={'primary'}>
        <FaTrash />
      </Button>
    </div>
  )
}
