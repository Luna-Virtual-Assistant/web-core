'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export type SidebarGenericProps<T = unknown> = {
  className?: string
  children: React.ReactNode
} & T

export function Sidebar({ className, children }: SidebarGenericProps) {
  return (
    <aside
      className={cn([
        'sticky left-0 top-0 flex flex-col border-r border-border h-screen',
        className,
      ])}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ className, children }: SidebarGenericProps) {
  return (
    <header
      className={cn([
        'p-6 flex items-center gap-4 border-b border-border box-border max-h-[80px]',
        className,
      ])}
    >
      {children}
    </header>
  )
}

export function SidebarNav({ className, children }: SidebarGenericProps) {
  return (
    <nav className={cn(['p-4 flex flex-col gap-2', className])}>{children}</nav>
  )
}

type SidebarNavLinkProps = {
  href: string
} & SidebarGenericProps

export function SidebarNavLink({
  className,
  children,
  href,
}: SidebarNavLinkProps) {
  const pathname = usePathname()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(pathname === href)
  }, [pathname, href])

  return (
    <Link
      href={href}
      className={cn([
        'flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md',
        className,
        active && 'bg-muted',
      ])}
    >
      {children}
    </Link>
  )
}

export function SidebarFooter({ className, children }: SidebarGenericProps) {
  return (
    <footer
      className={cn([
        'max-h-[4.5rem] mt-auto py-4 px-6 border-t border-border flex items-center gap-3',
        className,
      ])}
    >
      {children}
    </footer>
  )
}
