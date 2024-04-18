import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreatePersonGuide } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const PersonGuideCreatePage: FC = () => {
  useDocumentTitle('Create Person Guide')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.personGuides.index}>Person Guides</Link>,
    },
    {
      title: 'Create Person Guide',
    },
  ]

  const [form] = Form.useForm()

  const { createPersonGuideMutate, isCreating } = useCreatePersonGuide()

  const onFinish = (values: any) => {
    const form = {
      ...values,
      languages: [],
    }

    createPersonGuideMutate(form, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.personGuides.edit(response.data.id))
        }

        notification.success({
          message: 'The person guide was created successfully',
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

          <Button htmlType={'submit'} icon={<FaFloppyDisk />} loading={isCreating} type={'primary'}>
            Save
          </Button>
        </Form>
      </Card>
    </Flex>
  )
}
