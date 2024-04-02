import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateCurrency } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, notification } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const CurrencyCreatePage: FC = () => {
  useDocumentTitle('Create Currency')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.currencies.index}>Currencies</Link>,
    },
    {
      title: 'Create Currency',
    },
  ]

  const [form] = Form.useForm()

  const { createCurrencyMutate, isCreating } = useCreateCurrency()

  const onFinish = (values: any) => {
    createCurrencyMutate(values, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.currencies.edit(response.data.id))
        }

        notification.success({
          message: 'The currency was created successfully',
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
          <Form.Item label={'Name'} name={'currency_name'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label={'Code'} name={'currency_code'} rules={[{ max: 3, required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item initialValue={null} label={'Symbol'} name={'currency_symbol'}>
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
