import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useAccommodationType, useUpdateAccommodationType } from '@/hooks'
import { routes } from '@/routes'
import { Breadcrumb, Button, Card, Flex, Form, Input, Spin, notification } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

export const AccommodationTypeEditPage: FC = () => {
  useDocumentTitle('Edit Accommodation Type')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.accommodationTypes.index}>Accommodation Types</Link>,
    },
    {
      title: 'Edit Accommodation Type',
    },
  ]

  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()

  const { accommodationType, isFetching } = useAccommodationType(id!)
  const { isUpdating, updateAccommodationTypeMutate } = useUpdateAccommodationType(id!)

  useEffect(() => {
    if (accommodationType) {
      form.setFieldsValue({
        accommodation_type: accommodationType.accommodation_type,
        type: accommodationType.type,
      })
    }
  }, [accommodationType, form])

  const onFinish = (values: any) => {
    updateAccommodationTypeMutate(values, {
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
            <Form.Item label={'Name'} name={'type'} rules={[{ required: true }]}>
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
