import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateGroup } from '@/hooks'
import { routes } from '@/routes'
import {
  Breadcrumb,
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Switch,
  notification,
} from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const GroupCreatePage: FC = () => {
  useDocumentTitle('Create Group')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.groups.index}>Groups</Link>,
    },
    {
      title: 'Create Group',
    },
  ]

  const [form] = Form.useForm()

  const { createGroupMutate, isCreating } = useCreateGroup()

  const onFinish = (values: any) => {
    createGroupMutate(values, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.groups.edit(response.data.id))
        }

        notification.success({
          message: 'The group was created successfully',
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
          <Form.Item label={'Name'} name={'group_name'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item initialValue={0} label={'Order'} name={'order'}>
            <InputNumber controls />
          </Form.Item>

          <Form.Item initialValue={''} label={'Description'} name={'description'}>
            <Input.TextArea allowClear autoSize />
          </Form.Item>

          <Form.Item initialValue={false} label={'In Search'} name={'in_search'}>
            <Switch />
          </Form.Item>

          <Form.Item initialValue={false} label={'Filter Included'} name={'filter_included'}>
            <Switch />
          </Form.Item>

          <Button htmlType={'submit'} loading={isCreating} type={'primary'}>
            Save
          </Button>
        </Form>
      </Card>
    </Flex>
  )
}
