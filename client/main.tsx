import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import './features/monaco-worker.js'

import './main.css'
// eslint-disable-next-line import/no-unresolved
import { TrpcClient } from '@client/trpc-client.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { toast, ToastContainer } from 'react-toastify'
import { registerSW } from 'virtual:pwa-register'
import { routes } from './pages/__routes.js'

if (import.meta.env.PROD) {
  const updateSW = registerSW({
    immediate: true,
    onOfflineReady() {
      toast('Offline ready')
    },
    onNeedRefresh() {
      if (confirm('New content available. Reload?')) {
        updateSW(true)
      }
    },
  })
}

if (!import.meta.env.SSR) {
  let name: string | null | undefined

  do {
    name = localStorage.getItem('name') ?? window.prompt('Write your name')

    if (name) {
      localStorage.setItem('name', name)
    }
  } while (!name)

  const router = createBrowserRouter(routes)

  const queryClient = new QueryClient()
  const trpcClient = TrpcClient.createClient({
    links: [
      httpBatchLink({
        url: '/trpc',
      }),
    ],
  })

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <TrpcClient.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer />
        </QueryClientProvider>
      </TrpcClient.Provider>
    </React.StrictMode>,
  )
}
