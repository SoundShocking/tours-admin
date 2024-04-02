import { FC, useState } from 'react'

import { MediaUploadModal } from '@/components/MediaUploadModal'
import { MEDIA_PAGE_SIZES, MODAL_TOP_OFFSET } from '@/constants'
import { useMediaFiles, usePagination } from '@/hooks'
import { IMediaFile } from '@/types'
import { Button, Card, Col, Flex, Image, Modal, Pagination, Row, Spin } from 'antd'
import { FaCheck } from 'react-icons/fa6'

import styles from '@/views/pages/media/MediaPage.module.scss'

interface Props {
  file: IMediaFile | null
  setFile: (file: IMediaFile | null) => void
}

export const MediaSingleFile: FC<Props> = ({ file, setFile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const { onPageChange, onPageSizeChange, page, perPage } = usePagination()

  const { isFetching, media, refetch } = useMediaFiles(page, perPage)

  const onAddFile = () => {
    setIsModalOpen(true)
  }

  const onRemoveFile = () => {
    setFile(null)
  }

  const onChooseFile = (file: IMediaFile) => {
    setFile(file)
    setIsModalOpen(false)
  }

  return (
    <>
      <Flex gap={'large'} vertical>
        {file && (
          <div style={{ aspectRatio: '1/1', display: 'flex', maxWidth: 150 }}>
            <Image preview={false} src={file?.preview} />
          </div>
        )}

        <Flex gap={'middle'}>
          <Button onClick={onAddFile} type={'primary'}>
            {file ? 'Change File' : 'Add File'}
          </Button>

          <Button danger onClick={onRemoveFile} type={'primary'}>
            Remove File
          </Button>
        </Flex>
      </Flex>

      <Modal
        destroyOnClose
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        style={{ top: MODAL_TOP_OFFSET }}
        title={'Choose File'}
        width={1200}
      >
        <Flex gap={'large'} vertical>
          <Flex align={'center'} justify={'space-between'}>
            <div>
              <Button onClick={() => setIsUploadModalOpen(true)} type={'primary'}>
                Add File
              </Button>
            </div>

            <div>
              <Pagination
                current={page}
                defaultPageSize={18}
                onChange={onPageChange}
                onShowSizeChange={onPageSizeChange}
                pageSizeOptions={MEDIA_PAGE_SIZES}
                showSizeChanger
                total={media?.meta.total || 1}
              />
            </div>
          </Flex>

          <Spin size={'large'} spinning={isFetching}>
            <Card>
              <Row gutter={[16, 16]}>
                {media?.data.map(file => (
                  <Col key={file.id} lg={6} md={6} sm={8} span={12} xl={4}>
                    <div className={styles.imageWrapper}>
                      <Image
                        alt={file.alt}
                        className={styles.image}
                        loading={'lazy'}
                        preview={false}
                        src={file.preview}
                      />

                      <div className={styles.controls}>
                        <Button
                          onClick={() => onChooseFile(file)}
                          shape={'circle'}
                          size={'large'}
                          type={'primary'}
                        >
                          <Flex align={'center'} justify={'center'}>
                            <FaCheck size={16} />
                          </Flex>
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Spin>

          <MediaUploadModal
            isOpen={isUploadModalOpen}
            refetch={refetch}
            setIsOpen={setIsUploadModalOpen}
          />
        </Flex>
      </Modal>
    </>
  )
}
