import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT, RECORDS_PAGE_SIZES } from '@/constants'
import { useDeleteType, useGroups, usePagination, useTypes } from '@/hooks'
import { routes } from '@/routes'
import { IType } from '@/types'
import {
  Button,
  Flex,
  Image,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  TableProps,
  notification,
} from 'antd'
import { FaPen, FaTrash } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

type ColumnsType<T> = TableProps<T>['columns']

const { confirm } = Modal

export const TypesPage: FC = () => {
  useDocumentTitle('Types')
  const navigate = useNavigate()

  const { onPageChange, onPageSizeChange, page, perPage } = usePagination(RECORDS_PAGE_SIZES[0])
  const [order, setOrder] = useState<null | string>(null)
  const [by, setBy] = useState<null | string>(null)
  const [groupId, setGroupId] = useState<null | number>(null)

  const { isFetching, types } = useTypes(page, perPage, '', order, by, groupId)
  const { deleteTypeMutateAsync, isDeleting } = useDeleteType()
  const { groups, isFetching: isGroupsFetching } = useGroups(1, 'all', '', 'name', 'asc')

  const onEdit = (id: number) => {
    navigate(routes.foods.edit(id))
  }

  const onDelete = (id: number) => {
    confirm({
      okType: 'danger',
      onOk() {
        return deleteTypeMutateAsync(id, {
          onSuccess: () => {
            notification.success({
              message: 'The type was deleted successfully',
              placement: NOTIFICATION_PLACEMENT,
            })
          },
        })
      },
      title: 'Are you sure you want to delete the type?',
    })
  }

  const columns: ColumnsType<IType> = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'thumb',
      render: (_, record) => {
        return record.thumb ? (
          <Image alt={''} preview={{ src: record.thumb.url }} src={record.thumb.preview} />
        ) : null
      },
      title: 'Thumb',
      width: 150,
    },
    {
      dataIndex: 'name',
      render: (_, record) => <Link to={`${routes.types.edit(record.id)}`}>{record.type_name}</Link>,
      sorter: true,
      title: 'Name',
      width: 250,
    },
    {
      dataIndex: 'group',
      render: (_, record) => {
        return record.group ? (
          <Link to={routes.groups.edit(record.group?.id!)}>{record.group?.group_name}</Link>
        ) : null
      },

      title: 'Group',
      width: 250,
    },
    {
      dataIndex: 'slug',
      title: 'Slug',
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
          <Link to={routes.types.create}>
            <Button type={'primary'}>Add</Button>
          </Link>

          <Flex gap={'middle'} wrap={'nowrap'}>
            <Input placeholder={'Search'} style={{ width: 200 }} suffix={<FaTrash />} />

            <Select
              allowClear
              loading={isGroupsFetching}
              onChange={value => setGroupId(value)}
              onClear={() => setGroupId(null)}
              options={
                groups?.data.map(group => ({ label: group.group_name, value: group.id })) || []
              }
              placeholder={'Choose Group'}
              style={{ width: 200 }}
              value={groupId}
            />

            <div>
              <Pagination
                current={page}
                defaultPageSize={RECORDS_PAGE_SIZES[0]}
                onChange={onPageChange}
                onShowSizeChange={onPageSizeChange}
                pageSizeOptions={RECORDS_PAGE_SIZES}
                showSizeChanger
                total={types?.meta.total || 1}
              />
            </div>

            <ContentLanguageSwitcher />
          </Flex>
        </Flex>

        <Table
          bordered
          columns={columns}
          dataSource={types?.data}
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
