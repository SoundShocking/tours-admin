import { FC } from 'react'

import { IMAGE_FORMATS, MAX_FILE_SIZE, MODAL_TOP_OFFSET, NOTIFICATION_PLACEMENT } from '@/constants'
import { getCSRF } from '@/helpers'
import { Modal, Upload, type UploadProps, notification, theme } from 'antd'
import { FaCloudArrowUp } from 'react-icons/fa6'

interface Props {
  isOpen: boolean
  refetch: () => void
  setIsOpen: (open: boolean) => void
}

const { Dragger } = Upload
const { useToken } = theme

export const MediaUploadModal: FC<Props> = ({ isOpen, refetch, setIsOpen }) => {
  const { token } = useToken()

  const onAllFilesUploaded = () => {
    setIsOpen(false)

    notification.success({
      message: 'All your files have been successfully uploaded!',
      placement: NOTIFICATION_PLACEMENT,
    })

    refetch()
  }

  const props: UploadProps = {
    action: `http://elife.loc/api/media`,
    beforeUpload(file) {
      const isImage = IMAGE_FORMATS.includes(file.type)
      const isLT10MB = file.size <= MAX_FILE_SIZE

      if (!isImage) {
        notification.error({
          message: `Invalid file type for upload. File ${file.name}`,
          placement: NOTIFICATION_PLACEMENT,
        })
      }

      if (!isLT10MB) {
        notification.error({
          message: 'File size exceeds allowed limit',
        })
      }

      return (isImage && isLT10MB) || Upload.LIST_IGNORE
    },
    headers: {
      'X-CSRF-TOKEN': getCSRF(),
    },
    listType: 'picture',
    maxCount: 10,
    multiple: true,
    name: 'file',
    onChange(info) {
      const { status } = info.file

      if (status === 'done') {
        if (info.fileList.every(f => f.status === 'done')) {
          onAllFilesUploaded()
        }
      }
    },
    withCredentials: true,
  }

  return (
    <Modal
      destroyOnClose
      footer={null}
      onCancel={() => setIsOpen(false)}
      open={isOpen}
      style={{ top: MODAL_TOP_OFFSET }}
      title={'Upload Media'}
      width={1000}
    >
      <Dragger {...props}>
        <p className={'ant-upload-drag-icon'}>
          <FaCloudArrowUp color={token.blue} size={64} />
        </p>
        <p className={'ant-upload-text'}>Drag and drop files or click to upload</p>
        <p className={'ant-upload-hint'}>Image formats jpeg/jpg/png/gif/bmp/webp</p>
      </Dragger>
    </Modal>
  )
}
