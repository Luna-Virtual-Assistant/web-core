'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FormEvent, useCallback, useState } from 'react'
import QRCode from 'react-qr-code'

export default function Whatsapp() {
  const [QRcode, setQRcode] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(50)

  const startTimer = useCallback(() => {
    setTimeLeft(50)
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval)
          setIsDialogOpen(false)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }, [])

  async function handleCreateSession(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    const sessionName = formData.get('sessionName') as string
    const token = process.env.NEXT_PUBLIC_TOKEN

    try {
      const response = await fetch(
        `http://localhost:7000/new-session?token=${token}&sessionName=${sessionName}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const data = await response.json()

      setQRcode(data.qrCode)
      setIsDialogOpen(true)
      startTimer()
    } catch {
      alert('Erro ao criar sessão')
    }
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="flex justify-center items-center flex-col">
          {QRcode && (
            <>
              <QRCode
                size={128}
                style={{ height: 'auto', maxWidth: '100%', width: '70%' }}
                value={QRcode}
              />
              <p className="mt-4 text-sm font-medium">
                Fechará em: {timeLeft} segundos
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="mt-6">
        <h1 className="text-1xl font-semibold">Insira um nome de sessão</h1>
        <form
          onSubmit={handleCreateSession}
          className="flex items-center gap-2 justify-center mt-4"
        >
          <Input
            name="sessionName"
            placeholder="Digite o nome da sessão"
            required
          />
          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </div>
  )
}
