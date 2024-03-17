'use client'

import { PiFan, PiTelevision } from 'react-icons/pi'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Switch } from '../ui/switch'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { LuLampCeiling } from 'react-icons/lu'
import { TbDeviceIpadQuestion } from 'react-icons/tb'

type DeviceProps = {
  className?: string
  title: string
  kind?: 'tv' | 'ac' | 'lamp' | 'other'
}

const ICONMAP = {
  tv: PiTelevision,
  ac: PiFan,
  lamp: LuLampCeiling,
  other: TbDeviceIpadQuestion,
}

export function Device({ className, title, kind = 'other' }: DeviceProps) {
  const [isOn, setIsOn] = useState(false)
  const Icon = ICONMAP[kind]

  return (
    <div
      className={cn([
        'border border-border p-4 rounded-md flex flex-col justify-center items-center gap-4',
        !isOn && 'bg-muted',
        className,
      ])}
    >
      <header className="w-full flex items-center justify-between">
        <span>{isOn ? 'On' : 'Off'}</span>
        <Switch onCheckedChange={(e) => setIsOn(e)} />
      </header>

      <main className="flex-1">
        <Avatar className="h-14 w-14 drop-shadow-sm">
          <AvatarFallback className={!isOn ? 'bg-background' : undefined}>
            <Icon className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </main>

      <footer title={title} className="text-center text-sm truncate max-w-full">
        {title}
      </footer>
    </div>
  )
}
