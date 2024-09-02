'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FormEvent, useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

export default function Whatsapp() {
  const [QRcode, setQRcode] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(50) // Tempo inicial de 50 segundos

  async function handleCreateSession(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    const sessionName = formData.get('sessionName') as string

    const token = process.env.NEXT_PUBLIC_TOKEN

    try {
      fetch(
        `http://localhost:7000/new-session?token=${token}&sessionName=${sessionName}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          setQRcode(data.qrCode)
          setIsDialogOpen(true)
          setTimeLeft(50)

          setTimeout(() => {
            setIsDialogOpen(false)
          }, 50 * 1000)
        })
    } catch {
      alert('Erro ao criar sessão')
    }
  }

  useEffect(() => {
    if (isDialogOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isDialogOpen, timeLeft])

  return (
    <div className="flex items-center justify-center flex-col">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="flex justify-center items-center flex-col">
          {QRcode && (
            <>
              <p>Fechará em: {timeLeft} segundos</p>
              <QRCode
                size={20}
                style={{ height: 'auto', maxWidth: '100%', width: '70%' }}
                value={QRcode}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      <div>
        <h1 className="text-1xl text-left font-semibold">
          Insira um nome de sessão
        </h1>
        <form
          onSubmit={handleCreateSession}
          className="flex items-center gap-2 justify-center"
        >
          <Input
            name="sessionName"
            placeholder="Digite o número de telefone"
            required
          />
          <Button type="submit">Enviar</Button>
        </form>
      </div>
    </div>
  )
}
