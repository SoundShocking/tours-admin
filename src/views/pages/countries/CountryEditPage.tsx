import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCountry, useUpdateCountry } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Spin, notification } from 'antd'
import { type ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useDocumentTitle } from 'usehooks-ts'

export const CountryEditPage: FC = () => {
  useDocumentTitle('Edit Country')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.countries.index}>Countries</Link>,
    },
    {
      title: 'Edit Country',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()

  const { country, isFetching } = useCountry(id as string)
  const { isUpdating, updateCountryMutate } = useUpdateCountry(id as string)

  useEffect(() => {
    if (country) {
      form.setFieldsValue({
        code: country.code,
        name: country.name,
      })
    }
  }, [country, form])

  const onFinish = (values: any) => {
    updateCountryMutate(values, {
      onSuccess: () => {
        notification.success({
          message: 'The country was updated successfully',
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
        <Spin spinning={isFetching}>
          <Form form={form} layout={'vertical'} onFinish={onFinish}>
            <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Code'} name={'code'} rules={[{ len: 2, required: true }]}>
              <Input maxLength={2} />
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
