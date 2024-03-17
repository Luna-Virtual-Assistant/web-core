import { Device } from '@/components/device'
import {
  Page,
  PageHeader,
  PageHeaderNav,
  PageHeaderTitle,
  PageMain,
} from '@/components/page'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

type Device = {
  title: string
  kind: 'tv' | 'ac' | 'lamp' | 'other'
}

const DEVICES: Device[] = [
  { title: 'Televisão da Sala', kind: 'tv' },
  { title: 'Ar condicionado - quarto 01', kind: 'ac' },
  { title: 'Lâmpada - quarto 03', kind: 'lamp' },
  { title: 'Lâmpada - quarto 02', kind: 'lamp' },
  { title: 'Lâmpada - quarto 01', kind: 'lamp' },
  { title: 'Lâmpada 2 - quarto 03', kind: 'lamp' },
  { title: 'Lâmpada 3 - quarto 03', kind: 'lamp' },
  { title: 'Lâmpada 3 - quarto 03', kind: 'lamp' },
]

export function DashboardPage() {
  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>Dashboard</PageHeaderTitle>

        <PageHeaderNav>
          <Button variant="outline">
            <PlusIcon className="w-4 h-4 mr-2" />
            <span>Adicionar</span>
          </Button>
        </PageHeaderNav>
      </PageHeader>

      <PageMain>
        <section className="bg-background p-6 rounded-md space-y-4">
          <header>
            <h2 className="text-xl">Meus dispositivos</h2>
            <span className="text-sm text-muted-foreground">
              {DEVICES.length} conectados
            </span>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {DEVICES.map((device, index) => (
              <Device key={index} kind={device.kind} title={device.title} />
            ))}
          </main>
        </section>
      </PageMain>
    </Page>
  )
}
