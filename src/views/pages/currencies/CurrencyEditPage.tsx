import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCurrency, useUpdateCurrency } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Spin, notification } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const CurrencyEditPage: FC = () => {
  useDocumentTitle('Edit Currency')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.currencies.index}>Currencies</Link>,
    },
    {
      title: 'Edit Currency',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()

  const { currency, isFetching } = useCurrency(id!)
  const { isUpdating, updateCurrencyMutate } = useUpdateCurrency(id!)

  useEffect(() => {
    if (currency) {
      form.setFieldsValue({
        currency_code: currency.currency_code,
        currency_name: currency.currency_name,
        currency_symbol: currency.currency_symbol,
      })
    }
  }, [currency, form])

  const onFinish = (values: any) => {
    updateCurrencyMutate(values, {
      onSuccess: () => {
        notification.success({
          message: 'The currency was updated successfully',
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
            <Form.Item label={'Name'} name={'currency_name'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Code'} name={'currency_code'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Symbol'} name={'currency_symbol'}>
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
