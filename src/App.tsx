import { RouterProvider } from 'react-router-dom'

import { useCSRF } from '@/hooks/useCSRF'
import { useMe } from '@/hooks/useMe'
import { router } from '@/router'
import { Spin } from 'antd'

function App() {
  const { isLoading: isCSRFLoading } = useCSRF()
  const { isLoading: isMeLoading } = useMe()

  if (isCSRFLoading || isMeLoading) {
    return <Spin fullscreen />
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
