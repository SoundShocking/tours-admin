import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { MEDIA_PAGE_SIZES, RECORDS_PAGE_SIZES } from '@/constants'
import { getDateByFormat } from '@/helpers'
import { usePagination, usePosts } from '@/hooks'
import { routes } from '@/routes'
import { IPost } from '@/types'
import {
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Switch,
  Table,
  TableProps,
} from 'antd'
import { FaPen, FaTrash } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

type ColumnsType<T> = TableProps<T>['columns']

const { confirm } = Modal

export const PostsPage: FC = () => {
  useDocumentTitle('Posts')
  const navigate = useNavigate()

  const { onPageChange, onPageSizeChange, page, perPage } = usePagination(RECORDS_PAGE_SIZES[0])
  const [order, setOrder] = useState<null | string>(null)
  const [by, setBy] = useState<null | string>(null)
  const [recordType, setRecordType] = useState<null | string>(null)
  const [trash, setTrash] = useState(false)

  const { isFetching, posts } = usePosts(page, perPage, '', recordType, trash)

  const onEdit = (id: number) => {
    navigate(routes.posts.edit(id))
  }

  const onDelete = (id: number) => {
    confirm({
      okType: 'danger',
      onOk() {
        // return deleteGroupMutateAsync(id, {
        //   onSuccess: () => {
        //     notification.success({
        //       message: 'The group was deleted successfully',
        //       placement: NOTIFICATION_PLACEMENT,
        //     })
        //   },
        // })
      },
      title: 'Are you sure you want to delete the post?',
    })
  }

  const columns: ColumnsType<IPost> = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'thumb',
      render: (_, record) => {
        return record.thumb ? <Image preview={false} src={record.thumb.preview} /> : null
      },
      title: 'Thumb',
      width: 150,
    },
    {
      dataIndex: 'name',
      render: (_, record) => <Link to={`${routes.posts.edit(record.id)}`}>{record.name}</Link>,
      sorter: false,
      title: 'Name',
      width: 300,
    },
    {
      dataIndex: 'type',
      title: 'Type',
      width: 100,
    },
    {
      dataIndex: 'slug',
      title: 'Slug',
      width: 200,
    },
    {
      dataIndex: 'created',
      render: (_, record) => {
        return <>{getDateByFormat(record.created, 'DD.MM.YY HH:mm')}</>
      },
      title: 'Created',
      width: 120,
    },
    {
      dataIndex: 'updated',
      render: (_, record) => {
        return <>{getDateByFormat(record.created, 'DD.MM.YY HH:mm')}</>
      },
      title: 'Updated',
      width: 120,
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
              disabled={false}
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
          <Link to={routes.posts.create}>
            <Button type={'primary'}>Add</Button>
          </Link>

          <Flex align={'center'} gap={'middle'}>
            <Input placeholder={'Search'} style={{ width: 200 }} suffix={<FaTrash />} />

            <Select
              allowClear
              onChange={value => setRecordType(value)}
              onClear={() => setRecordType(null)}
              options={[
                { label: 'Articles', value: 'articles' },
                { label: 'News', value: 'news' },
              ]}
              placeholder={'Record Type'}
              style={{ width: 150 }}
              value={recordType}
            />

            <Checkbox checked={trash} onChange={e => setTrash(e.target.checked)}>
              Trash
            </Checkbox>

            <div>
              <Pagination
                current={page}
                defaultPageSize={RECORDS_PAGE_SIZES[0]}
                onChange={onPageChange}
                onShowSizeChange={onPageSizeChange}
                pageSizeOptions={RECORDS_PAGE_SIZES}
                showSizeChanger
                total={posts?.meta.total || 1}
              />
            </div>

            <ContentLanguageSwitcher />
          </Flex>
        </Flex>

        <Table
          bordered
          columns={columns}
          dataSource={posts?.data}
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
