import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateStatus } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, notification } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const StatusCreatePage: FC = () => {
  useDocumentTitle('Create Status')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.statuses.index}>Statuses</Link>,
    },
    {
      title: 'Create Status',
    },
  ]

  const [form] = Form.useForm()

  const { createStatusMutate, isCreating } = useCreateStatus()

  const onFinish = (values: any) => {
    createStatusMutate(values, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.statuses.edit(response.data.id))
        }

        notification.success({
          message: 'The status was created successfully',
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
        <Form form={form} layout={'vertical'} onFinish={onFinish}>
          <Form.Item label={'Name'} name={'departure_type'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item hidden initialValue={null} name={'key'} />

          <Button htmlType={'submit'} loading={isCreating} type={'primary'}>
            Save
          </Button>
        </Form>
      </Card>
    </Flex>
  )
}
