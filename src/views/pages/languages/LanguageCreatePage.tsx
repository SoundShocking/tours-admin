import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { NOTIFICATION_PLACEMENT } from '@/constants'
import { getRandomNumber } from '@/helpers'
import { useCreateLanguage } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Select, notification } from 'antd'

export const LanguageCreatePage: FC = () => {
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.languages.index}>Languages</Link>,
    },
    {
      title: 'Create Language',
    },
  ]

  const [form] = Form.useForm()

  const { createLanguageMutate, isCreating } = useCreateLanguage()

  const onFinish = (values: any) => {
    createLanguageMutate(values, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.languages.edit(response.data.id))
        }

        notification.success({
          message: 'The language was created successfully',
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

          <Form.Item label={'Native'} name={'native'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={'ltr'}
            label={'Direction'}
            name={'direction'}
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: 'rtl', value: 'rtl' },
                { label: 'ltr', value: 'ltr' },
              ]}
            />
          </Form.Item>

          <Form.Item label={'Code'} name={'code'} rules={[{ len: 2, required: true }]}>
            <Input maxLength={2} />
          </Form.Item>

          <Form.Item
            hidden
            initialValue={getRandomNumber(100_000, 999_999)}
            label={'Order'}
            name={'order'}
          >
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
