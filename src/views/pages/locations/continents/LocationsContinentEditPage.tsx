import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useLocationsContinent, useUpdateLocationsContinent } from '@/hooks'
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
  Spin,
  Switch,
  notification,
} from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const LocationsContinentEditPage: FC = () => {
  useDocumentTitle('Edit Continent')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.locations.continents.index}>Continents</Link>,
    },
    {
      title: 'Edit Continent',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const { continent, isFetching } = useLocationsContinent(id!)
  const { isUpdating, updateTourContinentMutate } = useUpdateLocationsContinent(id!)

  useEffect(() => {
    if (continent) {
      form.setFieldsValue({
        bottom_content: continent.bottom_content,
        content: continent.content,
        description: continent.seo?.description || '',
        in_search: continent.in_search,
        key_words: continent.seo?.key_words || '',
        latitude: continent.latitude,
        longitude: continent.longitude,
        name: continent.name,
        slug: continent.slug,
        title: continent.seo?.title || '',
      })

      setSeoPreview(continent.seo?.media || null)
    }
  }, [continent, form])

  const onFinish = (values: any) => {
    const form = {
      ...values,
      api_id: continent?.api_id,
      key: continent?.key,
      seo_preview: seoPreview?.id || null,
      type: continent?.type,
    }

    updateTourContinentMutate(form, {
      onSuccess: () => {
        notification.success({
          message: 'The continent was updated successfully',
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
