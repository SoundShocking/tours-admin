import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateLocationsContinent } from '@/hooks'
import { routes } from '@/routes'
import { IMediaFile } from '@/types'
import { Breadcrumb, Button, Card, Col, Flex, Form, Input, Row, Switch, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const LocationsContinentCreatePage: FC = () => {
  useDocumentTitle('Create Continent')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.locations.continents.index}>Continents</Link>,
    },
    {
      title: 'Create Continent',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { createTourContinentMutate, isCreating } = useCreateLocationsContinent()

  const onFinish = (values: any) => {
    const form = {
      ...values,
      seo_preview: seoPreview?.id || null,
      type: 'continent',
    }

    createTourContinentMutate(form, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.locations.continents.edit(response.data.id))
        }

        notification.success({
          message: 'The continent was created successfully',
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

              <Form.Item label={'In Search'} name={'in_search'}>
                <Switch />
              </Form.Item>

              <Form.Item initialValue={''} label={'Content'} name={'content'}>
                {/*// @ts-ignore:next-line*/}
                <RichTextEditor />
              </Form.Item>

              <Form.Item initialValue={''} label={'Bottom Content'} name={'bottom_content'}>
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
