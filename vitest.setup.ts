import { vi, beforeAll } from 'vitest'
import '@testing-library/jest-dom'

declare global {
  interface Window {
    IS_REACT_ACT_ENVIRONMENT: boolean
  }
}

;(globalThis as unknown as Record<string, unknown>)['IS_REACT_ACT_ENVIRONMENT'] = true

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver

global.MutationObserver = class MutationObserver {
  observe() {}
  disconnect() {}
  takeRecords() {
    return []
  }
} as unknown as typeof MutationObserver

global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
} as unknown as typeof IntersectionObserver

beforeAll(() => {
  if (typeof window !== 'undefined') {
    window.IS_REACT_ACT_ENVIRONMENT = true
  }

  const rootsToCreate = ['modalRoot', 'notificationRoot', 'tooltipRoot', 'menuRoot', 'additionalButtonsRoot']

  rootsToCreate.forEach((id) => {
    const root = document.createElement('div')
    root.setAttribute('id', id)
    document.body.appendChild(root)
  })

  global.fetch = vi.fn(() =>
    Promise.resolve(new Response(JSON.stringify({}), { status: 200 }))
  ) as unknown as typeof fetch

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target
      if (target instanceof Element) {
        const link = target.closest('a')
        if (link) e.preventDefault()
      }
    },
    true
  )
})
