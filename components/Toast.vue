<template>
  <div class="fixed top-4 right-4 z-50">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center p-4 mb-4 rounded-lg shadow-lg"
        :class="{
          'bg-green-500 text-white': toast.type === 'success',
          'bg-red-500 text-white': toast.type === 'error',
          'bg-blue-500 text-white': toast.type === 'info'
        }"
      >
        <div class="flex items-center">
          <div class="mr-3">
            <Icon
              :name="getIcon(toast.type)"
              class="w-5 h-5"
            />
          </div>
          <div class="text-sm font-medium">
            {{ toast.message }}
          </div>
        </div>
        <button
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-white/20"
          @click="remove(toast.id)"
        >
          <span class="sr-only">Close</span>
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, remove } = useToast()

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return 'heroicons:check-circle'
    case 'error':
      return 'heroicons:x-circle'
    case 'info':
      return 'heroicons:information-circle'
    default:
      return 'heroicons:bell'
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 