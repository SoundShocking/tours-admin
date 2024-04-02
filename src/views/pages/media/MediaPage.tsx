import { FC, useState } from 'react'

import { MediaFileInfoModal, MediaUploadModal } from '@/components'
import { IMAGE_FALLBACK, MEDIA_PAGE_SIZES } from '@/constants'
import { useMediaFiles, usePagination } from '@/hooks'
import { Button, Card, Col, Flex, Image, Pagination, Row, Spin } from 'antd'
import { FaEye } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

import styles from './MediaPage.module.scss'

export const MediaPage: FC = () => {
  useDocumentTitle('Media')

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const { onPageChange, onPageSizeChange, page, perPage } = usePagination()

  const [fileId, setFileId] = useState<null | number>(null)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

  const { isFetching, media, refetch } = useMediaFiles(page, perPage)

  const onShowInfo = (fileId: number) => {
    setFileId(fileId)
    setIsInfoModalOpen(true)
  }

  return (
    <>
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
                      fallback={IMAGE_FALLBACK}
                      loading={'lazy'}
                      preview={false}
                      src={file.preview}
                    />

                    <div className={styles.controls}>
                      <Button
                        onClick={() => onShowInfo(file.id)}
                        shape={'circle'}
                        size={'large'}
                        type={'primary'}
                      >
                        <Flex align={'center'} justify={'center'}>
                          <FaEye size={16} />
                        </Flex>
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Spin>
      </Flex>

      <MediaUploadModal
        isOpen={isUploadModalOpen}
        refetch={refetch}
        setIsOpen={setIsUploadModalOpen}
      />

      <MediaFileInfoModal
        fileId={fileId}
        isOpen={isInfoModalOpen}
        refetch={refetch}
        setIsOpen={setIsInfoModalOpen}
      />
    </>
  )
}
