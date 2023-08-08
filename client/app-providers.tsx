import { ReactNode, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'

import { TrpcClient } from '@client/trpc-client.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { ToastContainer } from 'react-toastify'
import './main.css'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    TrpcClient.createClient({
      links: [
        httpBatchLink({
          url: '/trpc',
        }),
      ],
    }),
  )

  return (
    <TrpcClient.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer />
      </QueryClientProvider>
    </TrpcClient.Provider>
  )
}
