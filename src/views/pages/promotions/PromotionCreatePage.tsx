import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreatePromotion } from '@/hooks'
import { routes } from '@/routes'
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  notification,
} from 'antd'
import dayjs from 'dayjs'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const PromotionCreatePage: FC = () => {
  useDocumentTitle('Create Promotion')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.promotions.index}>Promotions</Link>,
    },
    {
      title: 'Create Promotion',
    },
  ]

  const [form] = Form.useForm()

  const { createPromotionMutate, isCreating } = useCreatePromotion()

  const onFinish = (values: any) => {
    const { valid_to, ...rest } = values
    const validTo = dayjs(valid_to)

    const form = {
      ...rest,
      api_id: null,
      pax_restriction: null,
      valid_to: validTo.isValid() ? validTo.format('YYYY-MM-DD') : null,
    }

    createPromotionMutate(form, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.promotions.edit(response.data.id))
        }

        notification.success({
          message: 'The promotion was created successfully',
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

          <Form.Item
            initialValue={'percent'}
            label={'Value Type'}
            name={'value_type'}
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: 'Percent', value: 'percent' },
                { label: 'Fix', value: 'fix' },
              ]}
            />
          </Form.Item>

          <Form.Item label={'Value'} name={'value'} rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item label={'Valid To'} name={'valid_to'} rules={[{ required: true }]}>
            <DatePicker format={{ format: 'YYYY-MM-DD' }} />
          </Form.Item>

          <Button htmlType={'submit'} icon={<FaFloppyDisk />} loading={isCreating} type={'primary'}>
            Save
          </Button>
        </Form>
      </Card>
    </Flex>
  )
}
