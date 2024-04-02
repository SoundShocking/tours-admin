import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT, RECORDS_PAGE_SIZES } from '@/constants'
import { useCurrencies, useDeleteCurrency, usePagination } from '@/hooks'
import { routes } from '@/routes'
import { ICurrency } from '@/types/currencies'
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

export const CurrenciesPage: FC = () => {
  useDocumentTitle('Currencies')
  const navigate = useNavigate()

  const { onPageChange, onPageSizeChange, page, perPage } = usePagination(RECORDS_PAGE_SIZES[0])
  const [order, setOrder] = useState<null | string>(null)
  const [by, setBy] = useState<null | string>(null)

  const { currencies, isFetching } = useCurrencies(page, perPage, '', order, by)
  const { deleteCurrencyMutateAsync, isDeleting } = useDeleteCurrency()

  const onEdit = (id: number) => {
    navigate(routes.currencies.edit(id))
  }

  const onDelete = (id: number) => {
    confirm({
      okType: 'danger',
      onOk() {
        return deleteCurrencyMutateAsync(id, {
          onSuccess: () => {
            notification.success({
              message: 'The currency was deleted successfully',
              placement: NOTIFICATION_PLACEMENT,
            })
          },
        })
      },
      title: 'Are you sure you want to delete the food?',
    })
  }

  const columns: ColumnsType<ICurrency> = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'currency_name',
      render: (_, record) => (
        <Link to={`${routes.currencies.edit(record.id)}`}>{record.currency_name}</Link>
      ),
      sorter: true,
      title: 'Name',
      width: 300,
    },
    {
      dataIndex: 'currency_code',
      title: 'Code',
      width: 100,
    },
    {
      dataIndex: 'symbol',
      title: 'Symbol',
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
          <Link to={routes.currencies.create}>
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
                total={currencies?.meta.total || 1}
              />
            </div>

            <ContentLanguageSwitcher />
          </Flex>
        </Flex>

        <Table
          bordered
          columns={columns}
          dataSource={currencies?.data}
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
