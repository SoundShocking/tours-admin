import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useFood, useUpdateFood } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Spin, notification } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const FoodEditPage: FC = () => {
  useDocumentTitle('Edit Food')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.foods.index}>Foods</Link>,
    },
    {
      title: 'Edit Food',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()

  const { food, isFetching } = useFood(id as string)
  const { isUpdating, updateFoodMutate } = useUpdateFood(id as string)

  useEffect(() => {
    if (food) {
      form.setFieldsValue({
        name: food.name,
        type: food.type,
      })
    }
  }, [food, form])

  const onFinish = (values: any) => {
    updateFoodMutate(values, {
      onSuccess: () => {
        notification.success({
          message: 'The food was updated successfully',
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

            <Form.Item hidden label={'Type'} name={'type'}>
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
