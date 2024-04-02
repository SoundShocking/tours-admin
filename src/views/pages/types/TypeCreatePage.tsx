import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher, MediaSingleFile, RichTextEditor } from '@/components'
import { SEO } from '@/components/SEO'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCreateType, useGroups } from '@/hooks'
import { routes } from '@/routes'
import { IMediaFile } from '@/types'
import { Breadcrumb, Button, Card, Flex, Form, Input, Select, notification } from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const TypeCreatePage: FC = () => {
  useDocumentTitle('Create Type')
  const navigate = useNavigate()

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.types.index}>Types</Link>,
    },
    {
      title: 'Edit Food',
    },
  ]

  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [thumb, setThumb] = useState<IMediaFile | null>(null)
  const [form] = Form.useForm()

  const { createTypeMutate, isCreating } = useCreateType()
  const { groups, isFetching: isGroupsFetching } = useGroups(1, 'all', '', 'name', 'asc')

  const onFinish = (values: any) => {
    const form = {
      ...values,
      seo_preview: seoPreview?.id || null,
      thumb: thumb?.id || null,
    }

    createTypeMutate(form, {
      onSuccess: response => {
        if (response.data.id) {
          navigate(routes.types.edit(response.data.id))
        }

        notification.success({
          message: 'The type was created successfully',
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
          <Form.Item label={'Name'} name={'type_name'} rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label={'Slug'} name={'slug'}>
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
                (option?.label.toLocaleLowerCase() ?? '').includes(input)
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

          <Button htmlType={'submit'} icon={<FaFloppyDisk />} loading={isCreating} type={'primary'}>
            Save
          </Button>
        </Form>
      </Card>
    </Flex>
  )
}
