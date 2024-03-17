import { cn } from '@/lib/utils'

export type PageGenericProps<T = unknown> = {
  className?: string
  children: React.ReactNode
} & T

export function Page({ className, children }: PageGenericProps) {
  return <main className={cn(['bg-muted', className])}>{children}</main>
}

export function PageHeader({ className, children }: PageGenericProps) {
  return (
    <header
      className={cn([
        'bg-background p-6 border-b border-border flex items-center justify-between box-border max-h-[80px]',
        className,
      ])}
    >
      {children}
    </header>
  )
}

export function PageHeaderTitle({ className, children }: PageGenericProps) {
  return <h1 className={cn(['text-2xl font-medium', className])}>{children}</h1>
}

export function PageHeaderNav({ className, children }: PageGenericProps) {
  return <nav className={cn(['', className])}>{children}</nav>
}

export function PageMain({ className, children }: PageGenericProps) {
  return <main className={cn(['p-6', className])}>{children}</main>
}

export function PageFooter({ className, children }: PageGenericProps) {
  return <footer className={cn(['', className])}>{children}</footer>
}
