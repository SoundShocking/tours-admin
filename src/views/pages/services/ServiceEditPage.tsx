import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useService, useUpdateService } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Spin, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const ServiceEditPage: FC = () => {
  useDocumentTitle('Edit Service')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.services.index}>Services</Link>,
    },
    {
      title: 'Edit Service',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const { isFetching, service } = useService(id!)
  const { isUpdating, updateServiceMutate } = useUpdateService(id!)

  useEffect(() => {
    if (service) {
      form.setFieldsValue({
        name: service.name,
      })
    }
  }, [service, form])

  const onFinish = (values: any) => {
    const form = {
      ...values,
      key: service?.key,
    }

    updateServiceMutate(form, {
      onSuccess: () => {
        notification.success({
          message: 'The service was updated successfully',
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
