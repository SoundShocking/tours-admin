import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher, MediaSingleFile, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { ELECTRICITY_OUTLETS, NOTIFICATION_PLACEMENT } from '@/constants'
import {
  useCurrencies,
  useLocationsContinents,
  useLocationsCountry,
  useUpdateLocationsCountry,
} from '@/hooks'
import { routes } from '@/routes'
import { IMediaFile } from '@/types'
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Switch,
  notification,
} from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const LocationsCountryEditPage: FC = () => {
  useDocumentTitle('Edit Country')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.locations.countries.index}>Countries</Link>,
    },
    {
      title: 'Edit Country',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [thumb, setThumb] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const { country, isFetching } = useLocationsCountry(id!)
  const { isUpdating, updateCountryMutate } = useUpdateLocationsCountry(id!)

  const { currencies, isFetching: isCurrenciesFetching } = useCurrencies(
    1,
    'all',
    '',
    'currency_name',
    'asc'
  )
  const { continents, isFetching: isContinentsFetching } = useLocationsContinents('name', 'asc')

  useEffect(() => {
    if (country) {
      form.setFieldsValue({
        bottom_content: country.bottom_content,
        content: country.content,
        country_code: country.country_code,
        currency_id: country.currency?.id || null,
        description: country.seo?.description || '',
        electricity_outlets: country.electricity_outlets,
        in_search: country.in_search,
        key_words: country.seo?.key_words || '',
        latitude: country.latitude,
        longitude: country.longitude,
        name: country.name,
        parent_id: country.parent?.id || null,
        slug: country.slug,
        title: country.seo?.title || '',
        title_in_search: country.title_in_search,
        vaccination: country.vaccination,
      })

      setSeoPreview(country.seo?.media || null)
    }
  }, [country, form])

  const onFinish = (values: any) => {
    const form = {
      ...values,
      api_id: country?.api_id,
      key: country?.key,
      seo_preview: seoPreview?.id || null,
      thumb: thumb?.id || null,
      type: country?.type,
    }

    updateCountryMutate(form, {
      onSuccess: () => {
        notification.success({
          message: 'The country was updated successfully',
          placement: NOTIFICATION_PLACEMENT,
        })
      },
    })
  }

  return (
    <Flex gap={'large'} vertical>
      <Flex align={'center'} justify={'space-between'}>
        <Breadcrumb items={breadcrumbs} />

        <ContentLanguageSwitcher />
      </Flex>

      <Form form={form} layout={'vertical'} onFinish={onFinish}>
        <Spin spinning={isFetching}>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Card>
                <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item label={'Slug'} name={'slug'}>
                  <Input />
                </Form.Item>

                <Form.Item label={'Title in search'} name={'title_in_search'}>
                  <Input />
                </Form.Item>

                <Form.Item label={'Latitude'} name={'latitude'} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item label={'Longitude'} name={'longitude'} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item label={'In Search'} name={'in_search'}>
                  <Switch />
                </Form.Item>

                <Form.Item
                  label={'Country Code'}
                  name={'country_code'}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label={'Currency'} name={'currency_id'} rules={[{ required: true }]}>
                  <Select
                    disabled={isCurrenciesFetching}
                    filterOption={(input, option) =>
                      (option?.label.toLocaleLowerCase() ?? '').includes(input.toLowerCase())
                    }
                    loading={isCurrenciesFetching}
                    options={(currencies?.data || []).map(currency => ({
                      label: currency.currency_name,
                      value: currency.id,
                    }))}
                    showSearch
                  />
                </Form.Item>

                <Form.Item label={'Electricity Outlets'} name={'electricity_outlets'}>
                  <Checkbox.Group options={ELECTRICITY_OUTLETS} />
                </Form.Item>

                <Form.Item label={'Continent'} name={'parent_id'} rules={[{ required: true }]}>
                  <Select
                    disabled={isContinentsFetching}
                    loading={isContinentsFetching}
                    options={(continents?.data || []).map(continent => ({
                      label: continent.name,
                      value: continent.id,
                    }))}
                  />
                </Form.Item>

                <Form.Item label={'Content'} name={'content'}>
                  {/*// @ts-ignore:next-line*/}
                  <RichTextEditor />
                </Form.Item>

                <Form.Item label={'Bottom Content'} name={'bottom_content'}>
                  {/*// @ts-ignore:next-line*/}
                  <RichTextEditor />
                </Form.Item>

                <Form.Item label={'Vaccination'} name={'vaccination'}>
                  {/*// @ts-ignore:next-line*/}
                  <RichTextEditor />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Card title={'SEO'} type={'inner'}>
                    <SEO seoPreview={seoPreview} setSeoPreview={setSeoPreview} />
                  </Card>
                </Form.Item>
              </Card>
            </Col>

            <Col span={6}>
              <Flex gap={'middle'} vertical>
                <Card>
                  <Button
                    htmlType={'submit'}
                    icon={<FaFloppyDisk />}
                    loading={isUpdating}
                    type={'primary'}
                  >
                    Save
                  </Button>
                </Card>

                <Card title={'Thumb'}>
                  <MediaSingleFile file={thumb} setFile={setThumb} />
                </Card>
              </Flex>
            </Col>
          </Row>
        </Spin>
      </Form>
    </Flex>
  )
}
