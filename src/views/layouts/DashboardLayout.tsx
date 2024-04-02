import { Navigate, Outlet } from 'react-router-dom'

import { useLogout } from '@/hooks/useLogout'
import { useMe } from '@/hooks/useMe'
import { Sidebar } from '@/views/partials/Sidebar'
import { Button, Layout } from 'antd'

import styles from './DashboardLayout.module.scss'

const { Content, Sider } = Layout

const DashboardLayout = () => {
  const { isError } = useMe()
  const { logoutMutate } = useLogout()

  if (isError) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Layout className={styles.layout}>
        <Sider className={styles.sidebar} width={300}>
          <Sidebar />

          <Button onClick={() => logoutMutate()} type={'primary'}>
            Logout
          </Button>
        </Sider>

        <Layout>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default DashboardLayout
