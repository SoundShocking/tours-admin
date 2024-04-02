import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useDeleteLocationsContinent, useLocationsContinents } from '@/hooks'
import { routes } from '@/routes'
import { ILocationContinent } from '@/types'
import { Button, Flex, Input, Modal, Space, Table, TableProps, notification } from 'antd'
import { FaPen, FaTrash } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

type ColumnsType<T> = TableProps<T>['columns']

const { confirm } = Modal

export const LocationsContinentsPage: FC = () => {
  useDocumentTitle('Continents')
  const navigate = useNavigate()

  const [order, setOrder] = useState<null | string>(null)
  const [by, setBy] = useState<null | string>(null)

  const { continents, isFetching } = useLocationsContinents(order, by)
  const { deleteTourContinentMutateAsync, isDeleting } = useDeleteLocationsContinent()

  const onEdit = (id: number) => {
    navigate(routes.locations.continents.edit(id))
  }

  const onDelete = (id: number) => {
    confirm({
      okType: 'danger',
      onOk() {
        return deleteTourContinentMutateAsync(id, {
          onSuccess: () => {
            notification.success({
              message: 'The continent was deleted successfully',
              placement: NOTIFICATION_PLACEMENT,
            })
          },
        })
      },
      title: 'Are you sure you want to delete the continent?',
    })
  }

  const columns: ColumnsType<ILocationContinent> = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'name',
      render: (_, record) => (
        <Link to={`${routes.locations.continents.edit(record.id)}`}>{record.name}</Link>
      ),
      sorter: true,
      title: 'Name',
      width: 250,
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
          <Link to={routes.locations.continents.create}>
            <Button type={'primary'}>Add</Button>
          </Link>

          <Flex gap={'middle'} wrap={'nowrap'}>
            <Input placeholder={'Search'} style={{ width: 200 }} suffix={<FaTrash />} />

            <ContentLanguageSwitcher />
          </Flex>
        </Flex>

        <Table
          bordered
          columns={columns}
          dataSource={continents?.data}
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
