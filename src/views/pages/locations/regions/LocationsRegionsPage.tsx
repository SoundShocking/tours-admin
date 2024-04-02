import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ContentLanguageSwitcher } from '@/components'
import { NOTIFICATION_PLACEMENT, RECORDS_PAGE_SIZES } from '@/constants'
import {
  useDeleteLocationsRegion,
  useLocationsCountries,
  useLocationsRegions,
  usePagination,
} from '@/hooks'
import { routes } from '@/routes'
import { ILocationRegion } from '@/types'
import {
  Button,
  Flex,
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

export const LocationsRegionsPage: FC = () => {
  useDocumentTitle('Regions')
  const navigate = useNavigate()

  const { onPageChange, onPageSizeChange, page, perPage } = usePagination(RECORDS_PAGE_SIZES[0])
  const [order, setOrder] = useState<null | string>(null)
  const [by, setBy] = useState<null | string>(null)
  const [countryId, setCountryId] = useState<null | number>(null)

  const { isFetching, regions } = useLocationsRegions(page, perPage, '', order, by, countryId)
  const { deleteTourRegionMutateAsync, isDeleting } = useDeleteLocationsRegion()
  const { countries, isFetching: isCountriesFetching } = useLocationsCountries(
    1,
    'all',
    '',
    'name',
    'asc'
  )

  const onEdit = (id: number) => {
    navigate(routes.locations.regions.edit(id))
  }

  const onDelete = (id: number) => {
    confirm({
      okType: 'danger',
      onOk() {
        return deleteTourRegionMutateAsync(id, {
          onSuccess: () => {
            notification.success({
              message: 'The region was deleted successfully',
              placement: NOTIFICATION_PLACEMENT,
            })
          },
        })
      },
      title: 'Are you sure you want to delete the region?',
    })
  }

  const columns: ColumnsType<ILocationRegion> = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'name',
      render: (_, record) => (
        <Link to={`${routes.locations.regions.edit(record.id)}`}>{record.name}</Link>
      ),
      sorter: true,
      title: 'Name',
      width: 250,
    },
    {
      dataIndex: 'country',
      render: (_, record) => {
        return record.parent ? (
          <Link to={routes.locations.countries.edit(record.parent.id)}>{record.parent.name}</Link>
        ) : null
      },
      title: 'Country',
      width: 250,
    },
    {
      dataIndex: 'continent',
      render: (_, record) => {
        return record.parent?.parent ? (
          <Link to={routes.locations.continents.edit(record.parent.parent.id)}>
            {record.parent.parent.name}
          </Link>
        ) : null
      },
      title: 'Continent',
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
          <Link to={routes.locations.regions.create}>
            <Button type={'primary'}>Add</Button>
          </Link>

          <Flex gap={'middle'} wrap={'nowrap'}>
            <Input placeholder={'Search'} style={{ width: 200 }} suffix={<FaTrash />} />

            <Select
              allowClear
              disabled={isCountriesFetching}
              filterOption={(input, option) =>
                (option?.label.toLocaleLowerCase() ?? '').includes(input.toLowerCase())
              }
              loading={isCountriesFetching}
              onChange={id => setCountryId(id)}
              onClear={() => setCountryId(null)}
              options={(countries?.data || []).map(county => ({
                label: county.name,
                value: county.id,
              }))}
              placeholder={'Choose Country'}
              showSearch
              style={{ width: 200 }}
              value={countryId}
            />

            <div>
              <Pagination
                current={page}
                defaultPageSize={RECORDS_PAGE_SIZES[0]}
                onChange={onPageChange}
                onShowSizeChange={onPageSizeChange}
                pageSizeOptions={RECORDS_PAGE_SIZES}
                showSizeChanger
                total={regions?.meta.total || 1}
              />
            </div>

            <ContentLanguageSwitcher />
          </Flex>
        </Flex>

        <Table
          bordered
          columns={columns}
          dataSource={regions?.data}
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
