'use client'

import { Loading } from '@/components/loading/page'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'

interface SchedulesProps {
  id: number
  text: string
  schedule_date: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Scheduless() {
  const [text, setText] = useState('')
  const [scheduleDate, setScheduleDate] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const token = process.env.NEXT_PUBLIC_TOKEN
  const apiUrl = `http://127.0.0.1:5000/api/schedules`

  const { data, error } = useSWR(`${apiUrl}?token=${token}`, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <Loading />

  const schedules: SchedulesProps[] = data.schedules

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const formattedDate = format(
      new Date(scheduleDate),
      'yyyy-MM-dd HH:mm:ss.SSSSSSxxx',
    )

    const body = {
      schedule_date: formattedDate,
      text,
      sessionName: '558496783580',
    }

    try {
      const response = await fetch(`${apiUrl}?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        mutate(apiUrl)
        setText('')
        setScheduleDate('')
      } else {
        alert('Erro ao enviar o agendamento.')
      }
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error)
    }
  }

  async function handleEdit(id: number) {
    const scheduleToEdit = schedules.find((schedule) => schedule.id === id)
    if (scheduleToEdit) {
      setText(scheduleToEdit.text)
      setScheduleDate(scheduleToEdit.schedule_date)
      setEditId(id)
      setDialogOpen(true)
    }
  }

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`${apiUrl}/${id}?token=${token}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        mutate(`${apiUrl}?token=${token}`)
      } else {
        alert('Erro ao deletar o agendamento.')
      }
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error)
    }
  }

  async function handleUpdate(event: React.FormEvent) {
    event.preventDefault()

    const formattedDate = format(
      new Date(scheduleDate),
      'yyyy-MM-dd HH:mm:ss.SSSSSSxxx',
    )

    const body = {
      text,
      schedule_date: formattedDate,
      sessionName: '558496783580',
    }

    try {
      const response = await fetch(`${apiUrl}/${editId}?token=${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        mutate(`${apiUrl}?token=${token}`)
        setText('')
        setScheduleDate('')
        setEditId(null)
        setDialogOpen(false)
      } else {
        alert('Erro ao atualizar o agendamento.')
      }
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error)
    }
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          className="border border-gray-200 p-2 w-full mt-4"
          placeholder="Digite o comando"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <Input
          type="datetime-local"
          className="border border-gray-200 p-2 w-full mt-4"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="bg-gray-900 text-white p-2 w-full mt-4"
        >
          Agendar
        </Button>
      </form>

      <div className="mt-4 max-h-80 overflow-y-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Comandos</th>
              <th className="py-2 px-4 border-b text-center">
                Data do Agendamento
              </th>
              <th className="py-2 px-4 border-b text-center">Status</th>
              <th className="py-2 px-4 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => {
              const scheduleDate = new Date(schedule.schedule_date)
              const now = new Date()
              const status = scheduleDate <= now ? 'Acionado' : 'Ativo'

              return (
                <tr key={schedule.id} className="text-center">
                  <td className="py-2 px-4 border-b break-words">
                    <div className="truncate">{schedule.text}</div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {format(scheduleDate, 'dd-MM-yyyy HH:mm')}
                  </td>
                  <td className="py-2 px-4 border-b">{status}</td>
                  <td className="py-2 px-4 border-b">
                    <Button
                      onClick={() => handleEdit(schedule.id)}
                      className="bg-blue-500 text-white px-2 py-1 mr-2"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(schedule.id)}
                      className="bg-red-500 text-white px-2 py-1"
                    >
                      Deletar
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Dialog for Editing Schedule */}
      <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
        <DialogTrigger />
        <DialogContent>
          <DialogTitle>Editar Agendamento</DialogTitle>
          <form onSubmit={handleUpdate}>
            <Input
              type="text"
              className="border border-gray-200 p-2 w-full mt-4"
              placeholder="Digite o comando"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <Input
              type="datetime-local"
              className="border border-gray-200 p-2 w-full mt-4"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-gray-900 text-white p-2 w-full mt-4"
            >
              Atualizar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
