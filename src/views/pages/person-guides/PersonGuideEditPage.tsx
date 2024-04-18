import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { usePersonGuide, useUpdatePersonGuide } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Spin, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const PersonGuideEditPage: FC = () => {
  useDocumentTitle('Edit Person Guide')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.personGuides.index}>Person Guides</Link>,
    },
    {
      title: 'Edit Person Guide',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const { isFetching, personGuide } = usePersonGuide(id!)
  const { isUpdating, updatePersonGuideMutate } = useUpdatePersonGuide(id!)

  useEffect(() => {
    if (personGuide) {
      form.setFieldsValue({
        name: personGuide.name,
      })
    }
  }, [personGuide, form])

  const onFinish = (values: any) => {
    const form = {
      ...values,
      languages: [],
    }

    updatePersonGuideMutate(form, {
      onSuccess: () => {
        notification.success({
          message: 'The person guide was updated successfully',
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

            <Button
              htmlType={'submit'}
              icon={<FaFloppyDisk />}
              loading={isUpdating}
              type={'primary'}
            >
              Save
            </Button>
          </Form>
        </Spin>
      </Card>
    </Flex>
  )
}
