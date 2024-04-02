import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateMandatory } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const MandatoryCreatePage: FC = () => {
  useDocumentTitle('Create Mandatory')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.mandatories.index}>Mandatories</Link>,
    },
    {
      title: 'Create Mandatory',
    },
  ]

  const [form] = Form.useForm()

  const { createMandatoryMutate, isCreating } = useCreateMandatory()

  const onFinish = (values: any) => {
    createMandatoryMutate(values, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.mandatories.edit(response.data.id))
        }

        notification.success({
          message: 'The mandatory was created successfully',
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

          <Form.Item label={'Description'} name={'description'}>
            <Input.TextArea allowClear autoSize />
          </Form.Item>

          <Button htmlType={'submit'} icon={<FaFloppyDisk />} loading={isCreating} type={'primary'}>
            Save
          </Button>
        </Form>
      </Card>
    </Flex>
  )
}
