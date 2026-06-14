import { expect, test } from '@playwright/test'

type DataLayerEvent = [string, ...unknown[]]

test('analytics emits expected custom events from user interactions', async ({ page }) => {
  const collectRequests: string[] = []

  await page.route('https://www.google-analytics.com/g/collect*', async (route) => {
    collectRequests.push(route.request().url())
    await route.fulfill({ status: 204, body: '' })
  })

  await page.goto('/')

  await page.getByRole('link', { name: 'About' }).click()
  await page.getByRole('button', { name: /Switch to/i }).click()
  await page.getByRole('link', { name: /demo/i }).first().click({ modifiers: ['Meta'] }).catch(() => {})
  await page.getByRole('link', { name: 'Repository' }).first().click({ modifiers: ['Meta'] }).catch(() => {})
  await page.getByLabel(/^Email:/).click({ modifiers: ['Meta'] }).catch(() => {})
  await page.getByLabel(/^GitHub:/).click({ modifiers: ['Meta'] }).catch(() => {})
  await page.getByLabel(/^LinkedIn:/).click({ modifiers: ['Meta'] }).catch(() => {})

  await page.getByRole('link', { name: /download resume/i }).first().click()

  // Browser queues gtag calls as IArguments; normalize to arrays for assertions.
  const dataLayer = await page.evaluate<DataLayerEvent[]>(() => {
    const dl = (globalThis as unknown as Window).dataLayer ?? []
    return dl.map((entry) =>
      Array.from(entry as ArrayLike<unknown>)
    ) as DataLayerEvent[]
  })

  const eventCalls = dataLayer.filter((entry) => entry[0] === 'event')
  const eventNames = eventCalls.map((entry) => String(entry[1]))

  expect(eventNames).toContain('nav_click')
  expect(eventNames).toContain('theme_toggle')
  expect(eventNames).toContain('project_click')
  expect(eventNames).toContain('contact_click')
  expect(eventNames).toContain('file_download')
  expect(eventNames).toContain('view_section')

  // If GA loads in the test environment, collect requests should be visible.
  // We don't fail if blocked by network/privacy tooling.
  test.info().annotations.push({
    type: 'ga_collect_count',
    description: String(collectRequests.length),
  })
})
