import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { NOTIFICATION_PLACEMENT } from '@/constants'
import { useDeleteLanguage, useLanguages } from '@/hooks'
import { routes } from '@/routes'
import { ILanguage } from '@/types'
import { Button, Flex, Modal, Space, Table, TableProps, notification } from 'antd'
import { FaPen, FaTrash } from 'react-icons/fa6'
import { useDocumentTitle } from 'usehooks-ts'

type ColumnsType<T> = TableProps<T>['columns']

const { confirm } = Modal

export const LanguagesPage: FC = () => {
  useDocumentTitle('Languages')

  const navigate = useNavigate()

  const { isFetching, languages } = useLanguages()
  const { deleteLanguageMutateAsync, isDeleting } = useDeleteLanguage()

  const onEdit = (id: number) => {
    navigate(routes.countries.edit(id))
  }

  const onDelete = (id: number) => {
    confirm({
      okType: 'danger',
      onOk() {
        return deleteLanguageMutateAsync(id, {
          onSuccess: () => {
            notification.success({
              message: 'The country was deleted successfully',
              placement: NOTIFICATION_PLACEMENT,
            })
          },
        })
      },
      title: 'Are you sure you want to delete the language?',
    })
  }

  const columns: ColumnsType<ILanguage> = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'name',
      render: (_, record) => <Link to={`${routes.languages.edit(record.id)}`}>{record.name}</Link>,
      title: 'Name',
      width: 150,
    },
    {
      dataIndex: 'native',
      title: 'Native',
      width: 150,
    },
    {
      dataIndex: 'code',
      title: 'Code',
      width: 100,
    },
    {
      dataIndex: 'direction',
      title: 'Direction',
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
          <Link to={routes.languages.create}>
            <Button type={'primary'}>Add</Button>
          </Link>
        </Flex>

        <Table
          bordered
          columns={columns}
          dataSource={languages?.data}
          loading={isFetching}
          pagination={false}
          rowKey={record => record.id}
          size={'small'}
        />
      </Flex>
    </div>
  )
}
