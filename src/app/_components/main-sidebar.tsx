'use client'

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavLink,
} from '@/components/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { LuLayoutDashboard, LuMoonStar } from 'react-icons/lu'
import { PiChatBold } from 'react-icons/pi'

export function MainSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <LuMoonStar className="w-8 h-8" />
        <h1 className="text-2xl font-semibold">Luna</h1>
      </SidebarHeader>

      <SidebarNav>
        <SidebarNavLink href="/dashboard">
          <LuLayoutDashboard className="w-4 h-4" />
          <p>Dashboard</p>
        </SidebarNavLink>

        <SidebarNavLink href="/chat">
          <PiChatBold className="w-4 h-4" />
          <p>Chat</p>
        </SidebarNavLink>

        <SidebarNavLink href="/agendamentos">
          <FaRegCalendarAlt className="w-4 h-4" />
          <p>Agendamentos</p>
        </SidebarNavLink>
      </SidebarNav>

      <SidebarFooter>
        <Avatar>
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
        <section className="flex flex-col">
          <p>Vitor Rafael</p>
          <p className="text-xs font-medium text-muted-foreground">
            rqfvitor@gmail.com
          </p>
        </section>
      </SidebarFooter>
    </Sidebar>
  )
}
