'use client'

import { MessageProps } from '@/components/message'
import mqtt, { MqttClient } from 'mqtt'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export function useChatPage() {
  const form = useForm()
  const [client, setClient] = useState<MqttClient | null>(null)
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [isDuplicated, setIsDuplicated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mqttConnect = () => {
      const newClient = mqtt.connect({
        keepalive: 60,
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        port: 8884,
        hostname: 'localhost',
      })
      setClient(newClient)
      return newClient
    }

    const newClient = mqttConnect()

    newClient.on('connect', () => {
      newClient.subscribe('/history/message', (err) => {
        if (err) {
          console.error(err)
        }
      })

      newClient.subscribe('/luna/web/duplicated', (err) => {
        if (err) {
          console.error(err)
        }
      })

      newClient.on('message', (topic, message) => {
        if (topic === '/luna/web/duplicated') {
          setIsDuplicated(true)
          return
        }

        const payload: MessageProps = {
          body: message.toString(),
          kind: 'received',
          timestamp: Date.now(),
        }
        setMessages((prev) => [...prev, payload])
      })
    })

    return () => {
      newClient.off('connect', () => {})
      newClient.end()
    }
  }, [])

  const handleSendMessage = useCallback(
    (message: string) => {
      if (client) {
        if (isDuplicated) {
          client.publish('/luna/select_contact', message)
          setIsDuplicated(false)
        } else {
          client.publish('/luna', message)
        }
        const newMessage: MessageProps = {
          body: message,
          kind: 'sent',
          timestamp: Date.now(),
        }
        setMessages((prev) => [...prev, newMessage])
      }
    },
    [client, isDuplicated],
  )

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      handleSendMessage(data.message)
      form.resetField('message')
    } catch (error) {
      console.error(error)
    }
  })

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return {
    form,
    messages,
    messagesEndRef,
    onSubmit,
  }
}
