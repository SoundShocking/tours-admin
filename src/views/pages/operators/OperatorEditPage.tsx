import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher, MediaSingleFile, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useOperator, useUpdateOperator } from '@/hooks/operators'
import { routes } from '@/routes'
import { IMediaFile } from '@/types'
import { Breadcrumb, Button, Card, Flex, Form, Input, Spin, Switch, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const OperatorEditPage: FC = () => {
  useDocumentTitle('Edit Operator')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.operators.index}>Operators</Link>,
    },
    {
      title: 'Edit Operator',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [thumb, setThumb] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const { isFetching, operator } = useOperator(id!)
  const { isUpdating, updateOperatorMutate } = useUpdateOperator(id!)

  useEffect(() => {
    if (operator) {
      form.setFieldsValue({
        api_id: operator.api_id,
        bottom_content: operator.bottom_content,
        code: operator.code,
        content: operator.content,
        description: operator.seo?.description || '',
        has_integration: operator.has_integration,
        key_words: operator.seo?.key_words || '',
        name: operator.name,
        slug: operator.slug,
        title: operator.seo?.title || '',
      })

      setThumb(operator.thumb || null)
      setSeoPreview(operator.seo?.media || null)
    }
  }, [operator, form])

  const onFinish = (values: any) => {
    const form = {
      ...values,
      seo_preview: seoPreview?.id || null,
      thumb: thumb?.id || null,
    }

    updateOperatorMutate(form, {
      onSuccess: () => {
        notification.success({
          message: 'The operator was updated successfully',
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
        <Spin spinning={isFetching}>
          <Form form={form} layout={'vertical'} onFinish={onFinish}>
            <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Slug'} name={'slug'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Code'} name={'code'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Has Integration'} name={'has_integration'}>
              <Switch disabled />
            </Form.Item>

            <Form.Item label={'Content'} name={'content'}>
              {/*// @ts-ignore:next-line*/}
              <RichTextEditor />
            </Form.Item>

            <Form.Item label={'Bottom Content'} name={'bottom_content'}>
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

            <Form.Item hidden label={'API Id'} name={'api_id'}>
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
