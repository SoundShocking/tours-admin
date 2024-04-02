import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateCountry } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, notification } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const CountryCreatePage: FC = () => {
  useDocumentTitle('Create Country')

  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.countries.index}>Countries</Link>,
    },
    {
      title: 'Edit Country',
    },
  ]

  const [form] = Form.useForm()

  const { createCountryMutate, isCreating } = useCreateCountry()

  const onFinish = (values: any) => {
    createCountryMutate(values, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.countries.edit(response.data.id))
        }

        notification.success({
          message: 'The country was created successfully',
          placement: NOTIFICATION_PLACEMENT,
        })
      },
    })
  }

  return (
    <Flex gap={'large'} vertical>
      <Flex align={'center'} justify={'space-between'}>
        <Breadcrumb items={breadcrumbs} />
      </Flex>

      <Card className={'resource-edit-form'}>
        <Form form={form} layout={'vertical'} onFinish={onFinish}>
          <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label={'Code'} name={'code'} rules={[{ len: 2, required: true }]}>
            <Input maxLength={2} />
          </Form.Item>

          <Button htmlType={'submit'} loading={isCreating} type={'primary'}>
            Save
          </Button>
        </Form>
      </Card>
    </Flex>
  )
}
