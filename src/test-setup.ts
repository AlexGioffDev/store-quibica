import { vi } from 'vitest'

function createLocalStorageMock() {
  let store: Record<string, string> = {}

  return {
    getItem: vi.fn<(key: string) => string | null>((key) => store[key] ?? null),
    setItem: vi.fn<(key: string, value: string) => void>((key, value) => {
      store[key] = value
    }),
    removeItem: vi.fn<(key: string) => void>((key) => {
      delete store[key]
    }),
    clear: vi.fn<() => void>(() => {
      store = {}
    }),
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: createLocalStorageMock(),
  writable: true,
  configurable: true,
})
