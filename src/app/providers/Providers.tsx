'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProgressTrackingProvider } from '@/contexts/ProgressTrackingContext'
import { WatchedVideosProvider } from '@/contexts/WatchedVideosContext'
import { HelmetProvider } from 'react-helmet-async'
import MotivationCard from '@/components/MotivationCard'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProgressTrackingProvider>
            <WatchedVideosProvider>
              {children}
              <MotivationCard />
              {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </WatchedVideosProvider>
          </ProgressTrackingProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}