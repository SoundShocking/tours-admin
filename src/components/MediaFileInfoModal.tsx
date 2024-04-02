import { FC, useEffect } from 'react'

import { IMAGE_FALLBACK, MODAL_TOP_OFFSET, NOTIFICATION_PLACEMENT } from '@/constants'
import { getDateByFormat } from '@/helpers'
import { useDeleteFile, useMediaFile, useUpdateFile } from '@/hooks'
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  notification,
} from 'antd'

const { confirm } = Modal

interface Props {
  fileId: null | number
  isOpen: boolean
  refetch: () => void
  setIsOpen: (open: boolean) => void
}

export const MediaFileInfoModal: FC<Props> = ({ fileId, isOpen, refetch, setIsOpen }) => {
  const { file, isFetching } = useMediaFile(fileId)
  const { isUpdating, updateFileMutate } = useUpdateFile(fileId!)
  const { deleteFileMutateAsync, isDeleting } = useDeleteFile()

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    updateFileMutate(values, {
      onSuccess: () => {
        notification.success({
          message: 'The file was updated successfully',
          placement: NOTIFICATION_PLACEMENT,
        })
      },
    })
  }

  const onDelete = () => {
    confirm({
      okType: 'danger',
      onOk() {
        return deleteFileMutateAsync(fileId!, {
          onSuccess: () => {
            refetch()
            setIsOpen(false)

            notification.success({
              message: 'The file was deleted successfully',
              placement: NOTIFICATION_PLACEMENT,
            })
          },
        })
      },
      title: 'Are you sure you want to delete the file?',
    })
  }

  useEffect(() => {
    if (file) {
      form.setFieldsValue({
        alt: file.alt,
        title: file.title,
      })
    }
  }, [file, form])

  return (
    <Modal
      destroyOnClose
      footer={null}
      onCancel={() => setIsOpen(false)}
      open={isOpen}
      style={{ top: MODAL_TOP_OFFSET }}
      title={'File Info'}
      width={1000}
    >
      <Spin spinning={isFetching}>
        <Row gutter={16}>
          <Col span={8}>
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    itemMarginBottom: 16,
                    lineHeight: 1,
                  },
                },
              }}
            >
              <Form form={form} layout={'vertical'} onFinish={onFinish}>
                <Form.Item label={'Title'} name={'title'}>
                  <Input.TextArea allowClear autoSize />
                </Form.Item>

                <Form.Item label={'Alt'} name={'alt'}>
                  <Input.TextArea allowClear autoSize />
                </Form.Item>

                <Form.Item label={'Extension'}>{file?.extension}</Form.Item>

                <Form.Item label={'Type'}>{file?.mime_type}</Form.Item>

                <Form.Item label={'Size'}>{file?.filesize}</Form.Item>

                {file?.dimensions && <Form.Item label={'Dimensions'}>{file?.dimensions}</Form.Item>}

                <Form.Item label={'Date Added'}>
                  {getDateByFormat(file?.created, 'DD.MM.YY | HH:mm')}
                </Form.Item>

                <Form.Item label={'Date Updated'}>
                  {getDateByFormat(file?.updated, 'DD.MM.YY | HH:mm')}
                </Form.Item>

                <Form.Item>
                  <Space size={'large'}>
                    <Button htmlType={'submit'} loading={isUpdating} type={'primary'}>
                      Save
                    </Button>

                    <Button danger loading={isDeleting} onClick={onDelete} type={'primary'}>
                      Delete
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </Col>

          <Col span={16}>
            {file?.url && <Image fallback={IMAGE_FALLBACK} preview={false} src={file?.url} />}
          </Col>
        </Row>
      </Spin>
    </Modal>
  )
}
