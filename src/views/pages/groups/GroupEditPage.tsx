import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useGroup, useUpdateGroup } from '@/hooks'
import { routes } from '@/routes'
import {
  Breadcrumb,
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Spin,
  Switch,
  notification,
} from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const GroupEditPage: FC = () => {
  useDocumentTitle('Edit Group')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.groups.index}>Groups</Link>,
    },
    {
      title: 'Edit Group',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()

  const { group, isFetching } = useGroup(id!)
  const { isUpdating, updateGroupMutate } = useUpdateGroup(id!)

  useEffect(() => {
    if (group) {
      form.setFieldsValue({
        description: group.description,
        filter_included: Boolean(group.filter_included),
        group_id: group.group_id,
        group_name: group.group_name,
        in_search: Boolean(group.in_search),
        order: group.order,
      })
    }
  }, [group, form])

  const onFinish = (values: any) => {
    updateGroupMutate(values, {
      onSuccess: () => {
        notification.success({
          message: 'The group was updated successfully',
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
            <Form.Item label={'Name'} name={'group_name'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Order'} name={'order'}>
              <InputNumber controls />
            </Form.Item>

            <Form.Item label={'Description'} name={'description'}>
              <Input.TextArea allowClear autoSize />
            </Form.Item>

            <Form.Item label={'In Search'} name={'in_search'}>
              <Switch />
            </Form.Item>

            <Form.Item label={'Filter Included'} name={'filter_included'}>
              <Switch />
            </Form.Item>

            <Form.Item hidden label={'Group Id'} name={'group_id'}>
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
