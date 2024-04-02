import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useLanguage, useUpdateLanguage } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Select, Spin, notification } from 'antd'

export const LanguageEditPage: FC = () => {
  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.languages.index}>Languages</Link>,
    },
    {
      title: 'Edit Language',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()

  const { isFetching, language } = useLanguage(id as string)
  const { isUpdating, updateLanguageMutate } = useUpdateLanguage(id as string)

  useEffect(() => {
    if (language) {
      form.setFieldsValue({
        code: language.code,
        direction: language.direction,
        name: language.name,
        native: language.native,
        order: language.order,
      })
    }
  }, [form, language])

  const onFinish = (values: any) => {
    updateLanguageMutate(values, {
      onSuccess: () => {
        notification.success({
          message: 'The language was updated successfully',
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

            <Form.Item label={'Native'} name={'native'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Direction'} name={'direction'} rules={[{ required: true }]}>
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

            <Form.Item hidden label={'Order'} name={'order'}>
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
