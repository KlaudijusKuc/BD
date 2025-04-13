import { defineNuxtPlugin } from '#app'
import { useToast } from '~/composables/useToast'

export default defineNuxtPlugin(() => {
  const { toasts, add, remove } = useToast()

  return {
    provide: {
      toast: {
        success: (message: string, timeout?: number) => add(message, 'success', timeout),
        error: (message: string, timeout?: number) => add(message, 'error', timeout),
        info: (message: string, timeout?: number) => add(message, 'info', timeout),
        remove
      }
    }
  }
}) 