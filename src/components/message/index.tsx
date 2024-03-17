import { cn } from '@/lib/utils'

export type MessageProps = {
  kind: 'sent' | 'received'
  body: string
  timestamp: number
}

export function Message({ message }: { message: MessageProps }) {
  return (
    <MessageWrapper message={message}>
      <MessageInfo message={message} />
      <MessageBody message={message} />
    </MessageWrapper>
  )
}

function MessageWrapper({
  children,
  message,
}: {
  children: React.ReactNode
  message: MessageProps
}) {
  return (
    <div
      className={cn([
        'flex flex-col drop-shadow-md',
        message.kind === 'sent' && 'self-end',
        message.kind === 'received' && 'self-start',
      ])}
    >
      {children}
    </div>
  )
}

function MessageInfo({ message }: { message: MessageProps }) {
  return (
    <section
      className={cn([
        'text-sm text-gray-500 space-x-1 mb-1',
        message.kind === 'sent' && 'self-end',
      ])}
    >
      <span>{message.kind === 'sent' ? 'Você' : 'Luna'}</span>
      <span>-</span>
      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
    </section>
  )
}

function MessageBody({ message }: { message: MessageProps }) {
  return (
    <div
      className={cn([
        'p-3 text-background rounded-xl max-w-max font-medium',
        message.kind === 'sent' && 'bg-background text-primary self-end',
        message.kind === 'received' && 'bg-primary text-background',
      ])}
    >
      {message.body}
    </div>
  )
}
