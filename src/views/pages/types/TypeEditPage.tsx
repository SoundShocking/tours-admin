import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ContentLanguageSwitcher, MediaSingleFile, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useGroups, useType, useUpdateType } from '@/hooks'
import { routes } from '@/routes'
import { IMediaFile } from '@/types'
import { Breadcrumb, Button, Card, Flex, Form, Input, Select, Spin, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const TypeEditPage: FC = () => {
  useDocumentTitle('Edit Type')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.types.index}>Types</Link>,
    },
    {
      title: 'Edit Type',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [thumb, setThumb] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()
  const { isFetching, type } = useType(id!)
  const { isUpdating, updateTypeMutate } = useUpdateType(id!)
  const { groups, isFetching: isGroupsFetching } = useGroups(1, 'all', '', 'name', 'asc')

  useEffect(() => {
    if (type) {
      form.setFieldsValue({
        bottom_content: type.bottom_content,
        code: type.code,
        content: type.content,
        description: type.seo?.description || '',
        group_id: type.group?.id || null,
        key_words: type.seo?.key_words || '',
        slug: type.slug,
        title: type.seo?.title || '',
        type: type.type,
        type_id: type.type_id,
        type_name: type.type_name,
      })

      setSeoPreview(type.seo?.media || null)
      setThumb(type.thumb || null)
    }
  }, [type, form])

  const onFinish = (values: any) => {
    const form = {
      ...values,
      seo_preview: seoPreview?.id || null,
      thumb: thumb?.id || null,
    }

    updateTypeMutate(form, {
      onSuccess: () => {
        notification.success({
          message: 'The type was updated successfully',
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
            <Form.Item label={'Name'} name={'type_name'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Slug'} name={'slug'} rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label={'Content'} name={'content'}>
              {/*// @ts-ignore:next-line*/}
              <RichTextEditor />
            </Form.Item>

            <Form.Item label={'Bottom Content'} name={'bottom_content'}>
              {/*// @ts-ignore:next-line*/}
              <RichTextEditor />
            </Form.Item>

            <Form.Item label={'Group'} name={'group_id'} rules={[{ required: true }]}>
              <Select
                filterOption={(input, option) =>
                  (option?.label.toLocaleLowerCase() ?? '').includes(input.toLowerCase())
                }
                loading={isGroupsFetching}
                optionFilterProp={'children'}
                options={
                  groups?.data.map(group => ({ label: group.group_name, value: group.id })) || []
                }
                placeholder={'Choose Group'}
                showSearch
              />
            </Form.Item>

            <Form.Item label={'Thumb'}>
              <MediaSingleFile file={thumb} setFile={setThumb} />
            </Form.Item>

            <Form.Item>
              <Card title={'SEO'} type={'inner'}>
                <SEO seoPreview={seoPreview} setSeoPreview={setSeoPreview} />
              </Card>
            </Form.Item>

            <Form.Item hidden label={'Type Id'} name={'type_id'}>
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
