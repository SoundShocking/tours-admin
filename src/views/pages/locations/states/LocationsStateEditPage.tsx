import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useLocationsCountries, useLocationsState, useUpdateLocationsState } from '@/hooks'
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
  Spin,
  Switch,
  notification,
} from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const LocationsStateEditPage: FC = () => {
  useDocumentTitle('Edit State')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.locations.states.index}>States</Link>,
    },
    {
      title: 'Edit State',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const { isFetching, state } = useLocationsState(id!)
  const { isUpdating, updateStateMutate } = useUpdateLocationsState(id!)

  const { countries, isFetching: isCountriesFetching } = useLocationsCountries(
    1,
    'all',
    '',
    'name',
    'asc'
  )

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        bottom_content: state.bottom_content,
        content: state.content,
        description: state.seo?.description || '',
        in_search: state.in_search,
        key_words: state.seo?.key_words || '',
        latitude: state.latitude,
        longitude: state.longitude,
        name: state.name,
        parent_id: state.parent?.id || null,
        slug: state.slug,
        title: state.seo?.title || '',
      })

      setSeoPreview(state.seo?.media || null)
    }
  }, [state, form])

  const onFinish = (values: any) => {
    const form = {
      ...values,
      api_id: state?.api_id,
      key: state?.key,
      seo_preview: seoPreview?.id || null,
      type: state?.type,
    }

    updateStateMutate(form, {
      onSuccess: () => {
        notification.success({
          message: 'The state was updated successfully',
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
                    loading={isUpdating}
                    type={'primary'}
                  >
                    Save
                  </Button>
                </Card>
              </Flex>
            </Col>
          </Row>
        </Spin>
      </Form>
    </Flex>
  )
}
