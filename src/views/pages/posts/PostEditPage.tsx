import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  ContentBuilder,
  ContentLanguageSwitcher,
  MediaSingleFile,
  RelatedTours,
} from '@/components'
import { SEO } from '@/components/SEO'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { getDateByFormat } from '@/helpers'
import { usePost, useUpdatePost } from '@/hooks'
import { routes } from '@/routes'
import {
  ContentBuilderBlock,
  IContentBuilderType,
  IMediaFile,
  IRelatedTour,
  PostRecordType,
} from '@/types'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Spin,
  notification,
} from 'antd'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

export const PostEditPage: FC = () => {
  useDocumentTitle('Edit Post')

  const breadcrumbs: ItemType[] = [
    {
      title: <Link to={routes.posts.index}>Posts</Link>,
    },
    {
      title: 'Edit Post',
    },
  ]

  const [content, setContent] = useState<IContentBuilderType>([])
  const [thumb, setThumb] = useState<IMediaFile | null>(null)
  const [seoPreview, setSeoPreview] = useState<IMediaFile | null>(null)
  const [relatedTours, setRelatedTours] = useState<IRelatedTour[]>([])
  const [form] = Form.useForm()

  const { id } = useParams<{ id: string }>()

  const { isFetching, post } = usePost(id!)
  const { isUpdating, updatePostMutate } = useUpdatePost(id!)

  useEffect(() => {
    if (post) {
      form.setFieldsValue({
        description: post.seo?.description || '',
        key_words: post.seo?.key_words || '',
        name: post.name,
        related_tours_title: '123',
        slug: post.slug,
        title: post.seo?.title || '',
        type: post.type,
      })

      setContent(post.content)
      setThumb(post.thumb || null)
      setSeoPreview(post.seo?.media || null)

      const related_tours = post.post_metas.find(meta => meta.type === 'related_tours')

      if (related_tours) {
        form.setFieldsValue({
          related_tours_title: related_tours.text,
        })

        setRelatedTours(
          related_tours.tours.map(tour => ({ id: tour.id, tour_name: tour.tour_name }))
        )
      }
    }
  }, [post, form])

  const onFinish = (values: any) => {
    const formattedContent = content.map(block => {
      if (block.type === ContentBuilderBlock.IMAGE) {
        return { ...block, content: { ...block.content, image: block.content.image?.id || null } }
      }

      return block
    })

    const form = {
      ...values,
      content: formattedContent,
      post_metas: [
        {
          related_tours: values.related_tours_title,
          related_tours_ids: relatedTours.map(tour => tour.id),
        },
      ],
      seo_preview: seoPreview?.id || null,
      thumb: thumb?.id || null,
    }

    updatePostMutate(form, {
      onSuccess: () => {
        notification.success({
          message: 'The post was updated successfully',
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

      <Form form={form} layout={'vertical'} onFinish={onFinish}>
        <Spin spinning={isFetching}>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Card>
                <Form.Item label={'Name'} name={'name'} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item label={'Slug'} name={'slug'}>
                  <Input />
                </Form.Item>

                <Form.Item label={'Content'} name={'content'}>
                  <ContentBuilder content={content} setContent={setContent} />
                </Form.Item>

                <Form.Item>
                  <Card title={'Related Tours'} type={'inner'}>
                    <RelatedTours selectedTours={relatedTours} setSelectedTours={setRelatedTours} />
                  </Card>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Card title={'SEO'} type={'inner'}>
                    <SEO seoPreview={seoPreview} setSeoPreview={setSeoPreview} />
                  </Card>
                </Form.Item>
              </Card>
            </Col>

            <Col span={6}>
              <Flex gap={'middle'} vertical>
                <Card>
                  <Form.Item label={'Created At'}>
                    {getDateByFormat(post?.created, 'DD.MM.YYYY HH:mm')}
                  </Form.Item>

                  <Form.Item label={'Updated At'}>
                    {getDateByFormat(post?.updated, 'DD.MM.YYYY HH:mm')}
                  </Form.Item>

                  <Form.Item label={'Type'} name={'type'}>
                    <Select
                      options={[
                        { label: 'Article', value: PostRecordType.ARTICLE },
                        { label: 'News', value: PostRecordType.NEWS },
                      ]}
                    />
                  </Form.Item>

                  <Button
                    htmlType={'submit'}
                    icon={<FaFloppyDisk />}
                    loading={isUpdating}
                    type={'primary'}
                  >
                    Save
                  </Button>
                </Card>

                <Card title={'Thumb'}>
                  <MediaSingleFile file={thumb} setFile={setThumb} />
                </Card>
              </Flex>
            </Col>
          </Row>
        </Spin>
      </Form>
    </Flex>
  )
}
