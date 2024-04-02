import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateLocationsState, useLocationsCountries } from '@/hooks'
import { routes } from '@/routes'
import { IMediaFile } from '@/types'
import {
  Breadcrumb,
  Button,
  Card,
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

export const LocationsStateCreatePage: FC = () => {
  useDocumentTitle('Create State')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.locations.states.index}>States</Link>,
    },
    {
      title: 'Create State',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { createStateMutation, isCreating } = useCreateLocationsState()

  const { countries, isFetching: isCountriesFetching } = useLocationsCountries(
    1,
    'all',
    '',
    'name',
    'asc'
  )

  const onFinish = (values: any) => {
    const form = {
      ...values,
      api_id: null,
      key: null,
      seo_preview: seoPreview?.id || null,
      type: 'state',
    }

    createStateMutation(form, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.locations.states.edit(response.data.id))
        }

        notification.success({
          message: 'The state was created successfully',
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

              <Form.Item label={'Slug'} name={'slug'}>
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

              <Form.Item label={'Country'} name={'parent_id'} rules={[{ required: true }]}>
                <Select
                  disabled={isCountriesFetching}
                  filterOption={(input, option) =>
                    (option?.label.toLocaleLowerCase() ?? '').includes(input.toLowerCase())
                  }
                  loading={isCountriesFetching}
                  options={(countries?.data || []).map(country => ({
                    label: country.name,
                    value: country.id,
                  }))}
                  showSearch
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
