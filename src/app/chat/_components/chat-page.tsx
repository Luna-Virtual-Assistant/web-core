'use client'

import { Message } from '@/components/message'
import {
  PageHeader,
  PageHeaderTitle,
  PageMain,
  PageFooter,
  Page,
} from '@/components/page'
import { useChatPage } from '../chat-page.hooks'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FaArrowUp } from 'react-icons/fa'

export function ChatPage() {
  const { messages, messagesEndRef, form, onSubmit } = useChatPage()

  return (
    <Page className="flex flex-col">
      <PageHeader className="sticky top-0 z-10">
        <PageHeaderTitle>Converse com Luna</PageHeaderTitle>
      </PageHeader>

      <PageMain className="max-w-[35vw] relative w-full mx-auto flex flex-col h-full overflow-y-auto p-0 py-4">
        <section className="flex flex-col gap-6 pb-20">
          {messages.map((message) => (
            <Message key={message.timestamp} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </section>

        <PageFooter className="fixed bottom-0 w-full bg-muted flex flex-col justify-center border-border max-w-[35vw] pb-2">
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex items-center gap-1">
              <Input
                type="text"
                placeholder="Digite uma mensagem"
                className="py-6 bg-background rounded-md"
                {...form.register('message')}
              />
              <Button type="submit" className="py-6">
                <FaArrowUp className="w-4 h-4" />
              </Button>
            </form>
          </Form>
          <p className="text-sm ml-0.5 mt-2 text-muted-foreground text-medium">
            Pressione Enter para enviar
          </p>
        </PageFooter>
      </PageMain>
    </Page>
  )
}
