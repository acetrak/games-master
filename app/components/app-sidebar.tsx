import * as React from 'react';

import { SearchForm } from '@/components/search-form';
import { VersionSwitcher } from '@/components/version-switcher';
import { NavUser } from '@/components/nav-user';
import { Link, useLocation } from '@remix-run/react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { menuData } from '~/lib/data';



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const location = useLocation();


  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={menuData.versions}
          defaultVersion={menuData.versions[0]}
        />

      </SidebarHeader>
      <SidebarContent>
        {menuData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.url === location.pathname}>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: 'shadcn',
            email: 'm@example.com',
            avatar: '/avatars/shadcn.jpg',
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
