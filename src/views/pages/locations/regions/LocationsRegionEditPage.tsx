import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useLocationsCountries, useLocationsRegion, useUpdateLocationsRegion } from '@/hooks'
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

export const LocationsRegionEditPage: FC = () => {
  useDocumentTitle('Edit Region')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.locations.regions.index}>Regions</Link>,
    },
    {
      title: 'Edit Region',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const { isFetching, region } = useLocationsRegion(id!)
  const { countries, isFetching: isCountriesFetching } = useLocationsCountries(
    1,
    'all',
    '',
    'name',
    'asc'
  )
  const { isUpdating, updateRegionMutate } = useUpdateLocationsRegion(id!)

  useEffect(() => {
    if (region) {
      form.setFieldsValue({
        bottom_content: region.bottom_content,
        content: region.content,
        description: region.seo?.description || '',
        in_search: region.in_search,
        key_words: region.seo?.key_words || '',
        latitude: region.latitude,
        longitude: region.longitude,
        name: region.name,
        parent_id: region.parent?.id || null,
        slug: region.slug,
        title: region.seo?.title || '',
      })

      setSeoPreview(region.seo?.media || null)
    }
  }, [region, form])

  const onFinish = (values: any) => {
    const form = {
      ...values,
      api_id: region?.api_id,
      key: region?.key,
      seo_preview: seoPreview?.id || null,
      type: region?.type,
    }

    updateRegionMutate(form, {
      onSuccess: () => {
        notification.success({
          message: 'The region was updated successfully',
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

                <Form.Item label={'Latitude'} name={'latitude'}>
                  <Input />
                </Form.Item>

                <Form.Item label={'Longitude'} name={'longitude'}>
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
