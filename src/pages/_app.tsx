import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import i18n from '@/lib/i18n';
import { AuthProvider } from '@/contexts/AuthContext';
import { AnalysisProvider } from '@/contexts/AnalysisContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    // Set initial language and direction
    const savedLang = localStorage.getItem('i18nextLng') || 'ar';
    document.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <AnalysisProvider>
              <Component {...pageProps} />
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#000000',
                    color: '#D4AF37',
                    border: '1px solid #D4AF37',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10B981',
                      secondary: '#000000',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: '#000000',
                    },
                  },
                }}
              />
            </AnalysisProvider>
          </AuthProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
