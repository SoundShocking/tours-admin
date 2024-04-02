import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateFood } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, notification } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const FoodCreatePage: FC = () => {
  useDocumentTitle('Create Food')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.foods.index}>Foods</Link>,
    },
    {
      title: 'Create Food',
    },
  ]

  const [form] = Form.useForm()

  const { createFoodMutate, isCreating } = useCreateFood()

  const onFinish = (values: any) => {
    createFoodMutate(values, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.foods.edit(response.data.id))
        }

        notification.success({
          message: 'The food was created successfully',
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
          <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
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
