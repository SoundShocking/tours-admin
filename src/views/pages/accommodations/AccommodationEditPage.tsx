import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useAccommodation, useUpdateAccommodation } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Spin, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const AccommodationEditPage: FC = () => {
  useDocumentTitle('Edit Accommodation')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.accommodations.index}>Accommodations</Link>,
    },
    {
      title: 'Edit Accommodation',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const { accommodation, isFetching } = useAccommodation(id!)
  const { isUpdating, updateAccommodationMutate } = useUpdateAccommodation(id!)

  useEffect(() => {
    if (accommodation) {
      form.setFieldsValue({
        description: accommodation.description,
        name: accommodation.name,
      })
    }
  }, [accommodation, form])

  const onFinish = (values: any) => {
    updateAccommodationMutate(values, {
      onSuccess: () => {
        notification.success({
          message: 'The accommodation was updated successfully',
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

            <Form.Item label={'Description'} name={'description'}>
              <Input.TextArea allowClear autoSize />
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
