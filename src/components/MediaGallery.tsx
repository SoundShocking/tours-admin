import { Dispatch, FC, SetStateAction, useState } from 'react'

import { MediaUploadModal } from '@/components/MediaUploadModal'
import { IMAGE_FALLBACK, MEDIA_PAGE_SIZES, MODAL_TOP_OFFSET } from '@/constants'
import { useMediaFiles, usePagination } from '@/hooks'
import { IMediaFile } from '@/types'
import { Button, Card, Col, Flex, Image, Modal, Pagination, Row, Spin } from 'antd'
import clsx from 'clsx'
import { FaCheck, FaTrash } from 'react-icons/fa6'

import styles from '@/views/pages/media/MediaPage.module.scss'

interface Props {
  files: IMediaFile[]
  setFiles: Dispatch<SetStateAction<IMediaFile[]>>
}

export const MediaGallery: FC<Props> = ({ files, setFiles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const { onPageChange, onPageSizeChange, page, perPage } = usePagination(18)

  const { isFetching, media } = useMediaFiles(page, perPage)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openUploadModal = () => {
    setIsUploadModalOpen(true)
  }

  const closeUploadModal = () => {
    setIsUploadModalOpen(false)
  }

  const onChooseFile = (file: IMediaFile) => {
    setFiles(prev => [...prev, file])
  }

  const onDeleteFile = (file: IMediaFile) => {
    setFiles(prev => prev.filter(f => f.id !== file.id))
  }

  return (
    <>
      <Card
        extra={
          <Button onClick={openModal} type={'primary'}>
            Choose Files
          </Button>
        }
        title={'Gallery'}
      >
        <Row gutter={[16, 16]}>
          {files.map(file => (
            <Col key={file.id} lg={4}>
              <div className={styles.imageWrapper}>
                <Image
                  alt={file.alt}
                  className={styles.image}
                  fallback={IMAGE_FALLBACK}
                  loading={'lazy'}
                  onClick={() => onDeleteFile(file)}
                  preview={false}
                  src={file.preview}
                />

                <div className={styles.controls}>
                  <Button
                    danger
                    onClick={() => onDeleteFile(file)}
                    shape={'circle'}
                    size={'large'}
                    type={'primary'}
                  >
                    <Flex align={'center'} justify={'center'}>
                      <FaTrash size={16} />
                    </Flex>
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        destroyOnClose
        footer={null}
        onCancel={closeModal}
        open={isModalOpen}
        style={{ top: MODAL_TOP_OFFSET }}
        title={'Choose Files'}
        width={1200}
      >
        <>
          <Flex gap={'large'} vertical>
            <Flex gap={'large'} vertical>
              <Flex align={'center'} justify={'space-between'}>
                <div>
                  <Button onClick={openUploadModal} type={'primary'}>
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
                        <div
                          className={clsx(styles.imageWrapper, {
                            [styles.active]: files.find(f => f.id === file.id),
                          })}
                        >
                          <Image
                            alt={file.alt}
                            className={styles.image}
                            fallback={IMAGE_FALLBACK}
                            loading={'lazy'}
                            preview={false}
                            src={file.preview}
                          />

                          <div className={styles.controls}>
                            {files.find(f => f.id === file.id) ? (
                              <Button
                                danger
                                onClick={() => onDeleteFile(file)}
                                shape={'circle'}
                                size={'large'}
                                type={'primary'}
                              >
                                <Flex align={'center'} justify={'center'}>
                                  <FaTrash size={16} />
                                </Flex>
                              </Button>
                            ) : (
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
                            )}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Spin>
            </Flex>
          </Flex>

          <MediaUploadModal closeModal={closeUploadModal} isOpen={isUploadModalOpen} />
        </>
      </Modal>
    </>
  )
}
