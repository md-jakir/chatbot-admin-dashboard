import '@/styles/globals.css';

import store from '@/redux/store';
import { Provider } from 'react-redux';

import type { AppPropsWithLayout } from '@/types';
import DashboardLayout from '@/layouts/DashboardLayout';
// import Head from 'next/head';
import useFonts from '@/hooks/useFonts';
import { ThemeProvider } from 'next-themes';
import Toaster from '@/components/ui/toaster';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { SessionProvider } from 'next-auth/react';

const ComponentMap = {
  dashboard: ({ Component, pageProps }: AppPropsWithLayout) => (
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  ),
  none: ({ Component, pageProps }: AppPropsWithLayout) => (
    <Component {...pageProps} />
  ),
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  ...rest
}: AppPropsWithLayout) {
  const { inter } = useFonts();

  const layout = Component.layout ?? 'none';
  const ModifiedComponent = ComponentMap[layout];

  return (
    <div className={inter}>
      {/* <Head></Head> */}
      <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Toaster />
          <Provider store={store}>
            <ModifiedComponent
              Component={Component}
              pageProps={{
                ...pageProps,
              }}
              {...rest}
            />
          </Provider>{' '}
        </TooltipProvider>
      </ThemeProvider>
      </SessionProvider>
    </div>
  );
}
