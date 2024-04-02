import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { ELECTRICITY_OUTLETS, NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateLocationsCountry, useCurrencies, useLocationsContinents } from '@/hooks'
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
  Switch,
  notification,
} from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const LocationsCountryCreatePage: FC = () => {
  useDocumentTitle('Create Country')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.locations.countries.index}>Countries</Link>,
    },
    {
      title: 'Create Country',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { createCountryMutate, isCreating } = useCreateLocationsCountry()

  const { currencies, isFetching: isCurrenciesFetching } = useCurrencies(
    1,
    'all',
    '',
    'currency_name',
    'asc'
  )
  const { continents, isFetching: isContinentsFetching } = useLocationsContinents('name', 'asc')

  const onFinish = (values: any) => {
    const form = {
      ...values,
      api_id: null,
      key: null,
      seo_preview: seoPreview?.id || null,
      type: 'country',
    }

    createCountryMutate(form, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.locations.countries.edit(response.data.id))
        }

        notification.success({
          message: 'The country was create successfully',
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
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Card>
              <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item initialValue={''} label={'Slug'} name={'slug'}>
                <Input />
              </Form.Item>

              <Form.Item label={'Latitude'} name={'latitude'} rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item label={'Longitude'} name={'longitude'} rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item initialValue label={'In Search'} name={'in_search'}>
                <Switch />
              </Form.Item>

              <Form.Item label={'Country Code'} name={'country_code'} rules={[{ required: true }]}>
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

              <Form.Item
                initialValue={[]}
                label={'Electricity Outlets'}
                name={'electricity_outlets'}
              >
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

              <Form.Item initialValue={''} label={'Content'} name={'content'}>
                {/*// @ts-ignore:next-line*/}
                <RichTextEditor />
              </Form.Item>

              <Form.Item initialValue={''} label={'Bottom Content'} name={'bottom_content'}>
                {/*// @ts-ignore:next-line*/}
                <RichTextEditor />
              </Form.Item>

              <Form.Item initialValue={''} label={'Vaccination'} name={'vaccination'}>
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
                  loading={isCreating}
                  type={'primary'}
                >
                  Save
                </Button>
              </Card>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Flex>
  )
}
