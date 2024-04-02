import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT, RECORDS_PAGE_SIZES } from '@/constants'
import { useDeleteStatus, usePagination, useStatuses } from '@/hooks'
import { routes } from '@/routes'
import { IStatus } from '@/types'
import {
  Button,
  Flex,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  TableProps,
  notification,
} from 'antd'
import { FaPen, FaTrash } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

type ColumnsType<T> = TableProps<T>['columns']

const { confirm } = Modal

export const StatusesPage: FC = () => {
  useDocumentTitle('Statuses')
  const navigate = useNavigate()

  const { onPageChange, onPageSizeChange, page, perPage } = usePagination(RECORDS_PAGE_SIZES[0])

  const { isFetching, statuses } = useStatuses(page, perPage, '')
  const { deleteStatusMutateAsync, isDeleting } = useDeleteStatus()

  const onEdit = (id: number) => {
    navigate(routes.foods.edit(id))
  }

  const onDelete = (id: number) => {
    confirm({
      okType: 'danger',
      onOk() {
        return deleteStatusMutateAsync(id, {
          onSuccess: () => {
            notification.success({
              message: 'The food was deleted successfully',
              placement: NOTIFICATION_PLACEMENT,
            })
          },
        })
      },
      title: 'Are you sure you want to delete the status?',
    })
  }

  const columns: ColumnsType<IStatus> = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'departure_type',
      render: (_, record) => (
        <Link to={`${routes.statuses.edit(record.id)}`}>{record.departure_type}</Link>
      ),
      sorter: true,
      title: 'Name',
      width: 200,
    },
    {
      render: (_, record) => (
        <>
          <Space>
            <Button onClick={() => onEdit(record.id)} shape={'circle'} type={'primary'}>
              <FaPen />
            </Button>

            <Button
              danger
              disabled={isDeleting}
              onClick={() => onDelete(record.id)}
              shape={'circle'}
              type={'primary'}
            >
              <FaTrash />
            </Button>
          </Space>
        </>
      ),
      title: 'Actions',
    },
  ]

  return (
    <div>
      <Flex gap={'large'} vertical>
        <Flex align={'center'} justify={'space-between'}>
          <Link to={routes.statuses.create}>
            <Button type={'primary'}>Add</Button>
          </Link>

          <Flex gap={'middle'} wrap={'nowrap'}>
            <Input placeholder={'Search'} style={{ width: 200 }} suffix={<FaTrash />} />

            <div>
              <Pagination
                current={page}
                defaultPageSize={RECORDS_PAGE_SIZES[0]}
                onChange={onPageChange}
                onShowSizeChange={onPageSizeChange}
                pageSizeOptions={RECORDS_PAGE_SIZES}
                showSizeChanger
                total={statuses?.meta.total || 1}
              />
            </div>

            <ContentLanguageSwitcher />
          </Flex>
        </Flex>

        <Table
          bordered
          columns={columns}
          dataSource={statuses?.data}
          loading={isFetching}
          pagination={false}
          rowKey={record => record.id}
          size={'small'}
        />
      </Flex>
    </div>
  )
}
