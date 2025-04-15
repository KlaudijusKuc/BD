<template>
  <div>
    <div class="flex items-center mb-8">
      <NuxtLink
        to="/admin/submissions"
        class="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 mr-4"
      >
        <ArrowLeftIcon class="w-5 h-5" />
      </NuxtLink>
      <h1 class="text-3xl font-display font-bold">Submission Details</h1>
    </div>
    
    <div v-if="isLoading" class="glass-card p-6">
      <p class="text-gray-400">Loading submission...</p>
    </div>
    
    <div v-else-if="error" class="glass-card p-6">
      <p class="text-red-400">{{ error }}</p>
    </div>
    
    <div v-else-if="submission" class="glass-card p-6">
      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-semibold">{{ submission.subject }}</h2>
          <p class="text-gray-400 mt-1">
            From {{ submission.name }} &lt;{{ submission.email }}&gt;
          </p>
        </div>
        
        <div class="flex items-center space-x-4">
          <span
            :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              submission.status === 'new'
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-green-500/20 text-green-400'
            ]"
          >
            {{ submission.status === 'new' ? 'New' : 'Responded' }}
          </span>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Message</h3>
          <p class="whitespace-pre-line">{{ submission.message }}</p>
        </div>
        
        <div class="text-sm text-gray-400">
          Received on {{ formatDate(submission.date) }}
        </div>
        
        <div class="flex justify-end space-x-4">
          <button
            @click="deleteSubmission"
            class="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg"
          >
            Delete
          </button>
          <button
            @click="updateStatus"
            class="px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg"
          >
            Mark as Responded
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="glass-card p-6">
      <p class="text-gray-400">Submission not found</p>
    </div>
    
    <div
      v-if="showStatusModal"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div class="glass-card max-w-md w-full">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">Update Status</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                v-model="selectedStatus"
                class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="new">New</option>
                <option value="responded">Responded</option>
              </select>
            </div>
            <div
              v-if="submission?.status === 'new'"
              class="text-sm text-gray-400"
            >
              Note: Marking as responded will notify the submitter
            </div>
          </div>
        </div>
        <div class="p-6 border-t border-gray-700 flex justify-end space-x-4">
          <button
            @click="showStatusModal = false"
            class="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            @click="saveStatus"
            class="px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeftIcon,
} from '@heroicons/vue/24/outline'

// Define the Submission interface with all required properties
interface Submission {
  id: number
  name: string
  email: string
  subject: string
  message: string
  date: string
  status: 'new' | 'pending' | 'responded' | 'rejected'
}

// Define page meta for admin layout
definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const submission = ref<Submission | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const showStatusModal = ref(false)
const selectedStatus = ref<'new' | 'responded'>('new')

// Format date to Lithuanian locale
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Fetch submission data from API
const fetchSubmission = async (): Promise<void> => {
  try {
    isLoading.value = true
    // Access route params safely with bracket notation
    const id = route.params['id'] as string
    const response = await fetch(`/api/contact/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch submission')
    }
    submission.value = await response.json()
  } catch (err) {
    console.error('Error fetching submission:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    isLoading.value = false
  }
}

// Show status update modal
const updateStatus = (): void => {
  if (!submission.value) return
  selectedStatus.value = submission.value.status as 'new' | 'responded'
  showStatusModal.value = true
}

// Save status changes
const saveStatus = async (): Promise<void> => {
  if (!submission.value) return

  try {
    const response = await fetch(`/api/contact/${submission.value.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: selectedStatus.value
      })
    })

    if (!response.ok) {
      throw new Error('Failed to update status')
    }

    submission.value.status = selectedStatus.value
    showStatusModal.value = false
  } catch (err) {
    console.error('Error updating status:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred'
  }
}

// Delete submission
const deleteSubmission = async (): Promise<void> => {
  if (!submission.value || !confirm('Are you sure you want to delete this submission?')) {
    return
  }

  try {
    const response = await fetch(`/api/contact/${submission.value.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete submission')
    }

    router.push('/admin/submissions')
  } catch (err) {
    console.error('Error deleting submission:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred'
  }
}

// Load submission data on component mount
onMounted(fetchSubmission)
</script> 