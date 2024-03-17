import {
  Page,
  PageFooter,
  PageHeader,
  PageHeaderTitle,
  PageMain,
} from '@/components/page'

export function MainPage() {
  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>Home</PageHeaderTitle>
      </PageHeader>

      <PageMain>
        <p>Main</p>
      </PageMain>

      <PageFooter>
        <p>Footer</p>
      </PageFooter>
    </Page>
  )
}
