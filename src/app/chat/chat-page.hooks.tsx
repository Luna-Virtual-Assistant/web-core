import { MessageProps } from '@/components/message'
import mqtt, { MqttClient } from 'mqtt'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function useChatPage() {
  const form = useForm()
  const [client, setClient] = useState<MqttClient | null>(null)
  const [messages, setMessages] = useState<MessageProps[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const mqttConnect = useCallback((host: string) => {
    const newClient = mqtt.connect(host, {
      keepalive: 60,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      port: 8883,
    })
    setClient(newClient)
    return newClient
  }, [])

  useEffect(() => {
    const newClient = mqttConnect('ws://localhost:8883')

    newClient.on('connect', () => {
      newClient.subscribe('/luna/response')
      setClient(newClient)
    })

    newClient.on('message', (topic, message) => {
      const payload: MessageProps = {
        body: message.toString(),
        kind: 'received',
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, payload])
    })

    return () => {
      newClient.off('connect', () => {
        newClient.subscribe('/luna/response')
      })

      newClient.off('message', () => {})
      newClient.end()
    }
  }, [mqttConnect])

  const handleSendMessage = useCallback(
    (message: string) => {
      if (client) {
        client.publish('/luna', message)
        const newMessage: MessageProps = {
          body: message,
          kind: 'sent',
          timestamp: Date.now(),
        }
        setMessages((prev) => [...prev, newMessage])
      }
    },
    [client],
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
