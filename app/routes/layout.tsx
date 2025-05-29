import { Outlet, useNavigation } from '@remix-run/react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import NavHeader from '~/components/nav-header';

export default function RootLayout() {
  const navigation = useNavigation();
  useEffect(() => {

    NProgress.configure({ showSpinner: false });

    if (navigation.state === 'loading') {
      NProgress.start();
    } else if (navigation.state === 'idle')
      NProgress.done();

  }, [navigation.state]);


  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <NavHeader></NavHeader>
          <div className="p-4 ">
            <div className="container">
              <Outlet />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
