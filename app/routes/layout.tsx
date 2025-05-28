import { Outlet } from "@remix-run/react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {/* <h3 className="text-white">route("/some/path/*", "catchall.tsx");</h3> */}
          <div className="p-4"><Outlet /></div>
        </main>
      </SidebarProvider>
    </>
  );
}
