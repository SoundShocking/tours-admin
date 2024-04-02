import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useCountries, useDeleteCountry } from '@/hooks'
import { routes } from '@/routes'
import { ICountry } from '@/types'
import { Button, Flex, Modal, Space, Table, type TableProps, notification } from 'antd'
import { FaPen, FaTrash } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

type ColumnsType<T> = TableProps<T>['columns']

const { confirm } = Modal

export const CountriesPage: FC = () => {
  useDocumentTitle('Countries')
  const navigate = useNavigate()

  const { countries, isFetching } = useCountries()
  const { deleteCountryMutateAsync, isDeleting } = useDeleteCountry()

  const onEdit = (id: number) => {
    navigate(routes.countries.edit(id))
  }

  const onDelete = (id: number) => {
    confirm({
      okType: 'danger',
      onOk() {
        return deleteCountryMutateAsync(id, {
          onSuccess: () => {
            notification.success({
              message: 'The country was deleted successfully',
              placement: NOTIFICATION_PLACEMENT,
            })
          },
        })
      },
      title: 'Are you sure you want to delete the country?',
    })
  }

  const columns: ColumnsType<ICountry> = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'name',
      render: (_, record) => <Link to={`${routes.countries.edit(record.id)}`}>{record.name}</Link>,
      title: 'Name',
      width: 200,
    },
    {
      dataIndex: 'code',
      title: 'Code',
      width: 100,
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
        <Flex>
          <Link to={routes.countries.create}>
            <Button type={'primary'}>Add</Button>
          </Link>
        </Flex>

        <Table
          bordered
          columns={columns}
          dataSource={countries?.data}
          loading={isFetching}
          pagination={false}
          rowKey={record => record.id}
          size={'small'}
        />
      </Flex>
    </div>
  )
}
