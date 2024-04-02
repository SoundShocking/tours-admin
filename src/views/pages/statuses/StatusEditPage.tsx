import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useStatus, useUpdateStatus } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Spin, notification } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const StatusEditPage: FC = () => {
  useDocumentTitle('Edit Status')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.statuses.index}>Statuses</Link>,
    },
    {
      title: 'Edit Status',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()

  const { isFetching, status } = useStatus(id!)
  const { isUpdating, updateStatusMutate } = useUpdateStatus(id!)

  useEffect(() => {
    if (status) {
      form.setFieldsValue({
        departure_type: status.departure_type,
      })
    }
  }, [form, status])

  const onFinish = (values: any) => {
    updateStatusMutate(values, {
      onSuccess: () => {
        notification.success({
          message: 'The status was updated successfully',
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
            <Form.Item label={'Name'} name={'departure_type'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Button htmlType={'submit'} loading={isUpdating} type={'primary'}>
              Save
            </Button>
          </Form>
        </Spin>
      </Card>
    </Flex>
  )
}
