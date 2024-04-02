import React from 'react'

import App from '@/App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from 'antd'
import locale from 'antd/es/locale/en_US'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import ReactDOM from 'react-dom/client'

dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  weekStart: 1,
})

import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={locale} theme={{ cssVar: true }}>
      <QueryClientProvider client={queryClient}>
        <App />

        <ReactQueryDevtools
          buttonPosition={'bottom-left'}
          initialIsOpen={false}
          position={'bottom'}
        />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
)
