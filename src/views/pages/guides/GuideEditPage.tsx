import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useGuide, useUpdateGuide } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Spin, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const GuideEditPage: FC = () => {
  useDocumentTitle('Edit Guide')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.guides.index}>Guides</Link>,
    },
    {
      title: 'Edit Guide',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const { guide, isFetching } = useGuide(id!)
  const { isUpdating, updateGuideMutate } = useUpdateGuide(id!)

  useEffect(() => {
    if (guide) {
      form.setFieldsValue({
        code: guide.code,
        name: guide.name,
      })
    }
  }, [guide, form])

  const onFinish = (values: any) => {
    const form = {
      ...values,
      api_id: guide?.api_id,
    }

    updateGuideMutate(form, {
      onSuccess: () => {
        notification.success({
          message: 'The guide was updated successfully',
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

      <Card className={'resource-edit-form'}>
        <Spin spinning={isFetching}>
          <Form form={form} layout={'vertical'} onFinish={onFinish}>
            <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Code'} name={'code'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Button
              htmlType={'submit'}
              icon={<FaFloppyDisk />}
              loading={isUpdating}
              type={'primary'}
            >
              Save
            </Button>
          </Form>
        </Spin>
      </Card>
    </Flex>
  )
}
