import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher, MediaSingleFile, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateOperator } from '@/hooks/operators'
import { routes } from '@/routes'
import { IMediaFile } from '@/types'
import { Breadcrumb, Button, Card, Flex, Form, Input, Switch, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const OperatorCreatePage: FC = () => {
  useDocumentTitle('Create Operator')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.operators.index}>Operators</Link>,
    },
    {
      title: 'Create Operator',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [thumb, setThumb] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { createOperatorMutate, isCreating } = useCreateOperator()

  const onFinish = (values: any) => {
    const form = {
      ...values,
      seo_preview: seoPreview?.id || null,
      thumb: thumb?.id || null,
    }

    createOperatorMutate(form, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.operators.edit(response.data.id))
        }

        notification.success({
          message: 'The operator was created successfully',
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

      <Card className={'resource-edit-form--wide'}>
        <Form form={form} layout={'vertical'} onFinish={onFinish}>
          <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label={'Slug'} name={'slug'}>
            <Input />
          </Form.Item>

          <Form.Item label={'Code'} name={'code'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item initialValue={false} label={'Has Integration'} name={'has_integration'}>
            <Switch disabled />
          </Form.Item>

          <Form.Item initialValue={null} label={'Content'} name={'content'}>
            {/*// @ts-ignore:next-line*/}
            <RichTextEditor />
          </Form.Item>

          <Form.Item initialValue={null} label={'Bottom Content'} name={'bottom_content'}>
            {/*// @ts-ignore:next-line*/}
            <RichTextEditor />
          </Form.Item>

          <Form.Item label={'Thumb'}>
            <MediaSingleFile file={thumb} setFile={setThumb} />
          </Form.Item>

          <Form.Item>
            <Card title={'SEO'} type={'inner'}>
              <SEO seoPreview={seoPreview} setSeoPreview={setSeoPreview} />
            </Card>
          </Form.Item>

          <Button htmlType={'submit'} icon={<FaFloppyDisk />} loading={isCreating} type={'primary'}>
            Save
          </Button>
        </Form>
      </Card>
    </Flex>
  )
}
