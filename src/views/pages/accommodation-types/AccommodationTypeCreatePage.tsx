import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateAccommodationType } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, notification } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const AccommodationTypeCreatePage: FC = () => {
  const navigate = useNavigate()

  useDocumentTitle('Create Accommodation Type')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.accommodationTypes.index}>Accommodation Types</Link>,
    },
    {
      title: 'Create Accommodation Type',
    },
  ]

  const [form] = Form.useForm()

  const { createAccommodationTypeMutate, isCreating } = useCreateAccommodationType()

  const onFinish = (values: any) => {
    createAccommodationTypeMutate(values, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.accommodationTypes.edit(response.data.id))
        }

        notification.success({
          message: 'The accommodation type was created successfully',
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
          <Form.Item label={'Name'} name={'type'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Button htmlType={'submit'} loading={isCreating} type={'primary'}>
            Save
          </Button>
        </Form>
      </Card>
    </Flex>
  )
}
