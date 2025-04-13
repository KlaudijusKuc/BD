import { ref } from 'vue'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  timeout?: number
}

const toasts = ref<Toast[]>([])
let nextId = 1

export function useToast() {
  const add = (message: string, type: Toast['type'] = 'info', timeout = 5000) => {
    const id = nextId++
    const toast: Toast = { id, message, type }
    toasts.value.push(toast)

    if (timeout) {
      setTimeout(() => {
        remove(id)
      }, timeout)
    }
  }

  const remove = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    add,
    remove
  }
} 