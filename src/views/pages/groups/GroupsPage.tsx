import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT, RECORDS_PAGE_SIZES } from '@/constants'
import { useDeleteGroup, useGroups, usePagination } from '@/hooks'
import { routes } from '@/routes'
import { IGroup } from '@/types'
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
  theme,
} from 'antd'
import { FaTimes } from 'react-icons/fa'
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

type ColumnsType<T> = TableProps<T>['columns']

const { confirm } = Modal

const { useToken } = theme

export const GroupsPage: FC = () => {
  useDocumentTitle('Groups')
  const navigate = useNavigate()
  const { token } = useToken()

  const { onPageChange, onPageSizeChange, page, perPage } = usePagination(RECORDS_PAGE_SIZES[0])
  const [order, setOrder] = useState<null | string>(null)
  const [by, setBy] = useState<null | string>(null)

  const { groups, isFetching } = useGroups(page, perPage, '', order, by)
  const { deleteGroupMutateAsync, isDeleting } = useDeleteGroup()

  const onEdit = (id: number) => {
    navigate(routes.groups.edit(id))
  }

  const onDelete = (id: number) => {
    confirm({
      okType: 'danger',
      onOk() {
        return deleteGroupMutateAsync(id, {
          onSuccess: () => {
            notification.success({
              message: 'The group was deleted successfully',
              placement: NOTIFICATION_PLACEMENT,
            })
          },
        })
      },
      title: 'Are you sure you want to delete the group?',
    })
  }

  const columns: ColumnsType<IGroup> = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'name',
      render: (_, record) => (
        <Link to={`${routes.groups.edit(record.id)}`}>{record.group_name}</Link>
      ),
      sorter: true,
      title: 'Name',
      width: 250,
    },
    {
      dataIndex: 'order',
      title: 'Order',
      width: 100,
    },
    {
      dataIndex: 'in_search',
      render: (_, record) => {
        return record.in_search ? (
          <FaCheck color={token.green} size={24} />
        ) : (
          <FaTimes color={token.red} size={24} />
        )
      },
      title: 'In Search',
      width: 140,
    },
    {
      dataIndex: 'filter_included',
      render: (_, record) => {
        return record.filter_included ? (
          <FaCheck color={token.green} size={24} />
        ) : (
          <FaTimes color={token.red} size={24} />
        )
      },
      title: 'Filter Included',
      width: 140,
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

  const onTableChange: TableProps['onChange'] = (_, __, sorter) => {
    // @ts-ignore
    if (sorter.order) {
      // @ts-ignore
      setOrder(sorter.field)
      // @ts-ignore
      setBy(sorter.order === 'ascend' ? 'asc' : 'desc')
    } else {
      setOrder(null)
      setBy(null)
    }
  }

  return (
    <div>
      <Flex gap={'large'} vertical>
        <Flex align={'center'} justify={'space-between'}>
          <Link to={routes.groups.create}>
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
                total={groups?.meta.total || 1}
              />
            </div>

            <ContentLanguageSwitcher />
          </Flex>
        </Flex>

        <Table
          bordered
          columns={columns}
          dataSource={groups?.data}
          loading={isFetching}
          onChange={onTableChange}
          pagination={false}
          rowKey={record => record.id}
          size={'small'}
        />
      </Flex>
    </div>
  )
}
