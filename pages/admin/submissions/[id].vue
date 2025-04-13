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
    
    <div v-if="submission" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Submission Details -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-xl font-semibold">{{ submission.subject }}</h2>
                <p class="text-gray-500 dark:text-gray-400 mt-1">
                  From {{ submission.name }} &lt;{{ submission.email }}&gt;
                </p>
              </div>
              <span
                :class="[
                  'px-3 py-1 text-sm font-medium rounded-full',
                  submission.status === 'new'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                ]"
              >
                {{ submission.status === 'new' ? 'New' : 'Responded' }}
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <div class="prose dark:prose-invert max-w-none">
              <p class="whitespace-pre-line">{{ submission.message }}</p>
            </div>
          </div>
          
          <div class="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Received on {{ formatDate(submission.date) }}
            </p>
          </div>
        </div>
        
        <!-- Response Form -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mt-8">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold">Respond to Submission</h2>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="submitResponse" class="space-y-6">
              <div>
                <label for="response" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Response</label>
                <textarea
                  id="response"
                  v-model="response"
                  rows="6"
                  required
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Type your response here..."
                ></textarea>
              </div>
              
              <div class="flex items-center">
                <button
                  type="submit"
                  class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">Sending...</span>
                  <span v-else>Send Response</span>
                </button>
                
                <button
                  v-if="submission.status === 'new'"
                  type="button"
                  @click="markAsResponded"
                  class="ml-4 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Mark as Responded
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Sidebar -->
      <div>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold">Actions</h2>
          </div>
          
          <div class="p-6 space-y-4">
            <button
              @click="deleteSubmission"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              <TrashIcon class="w-5 h-5 mr-2" />
              Delete Submission
            </button>
            
            <button
              @click="exportSubmission"
              class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
              Export as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
      <p class="text-gray-500 dark:text-gray-400">Submission not found</p>
      <NuxtLink
        to="/admin/submissions"
        class="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
      >
        <ArrowLeftIcon class="w-5 h-5 mr-2" />
        Back to Submissions
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ArrowLeftIcon, 
  TrashIcon, 
  ArrowDownTrayIcon 
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const submission = ref(null)
const response = ref('')
const isSubmitting = ref(false)

onMounted(() => {
  // In a real application, this would fetch data from an API
  // For now, we'll use localStorage
  const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
  const id = parseInt(route.params.id as string)
  submission.value = submissions.find((s: any) => s.id === id) || null
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const submitResponse = async () => {
  if (!response.value.trim()) return
  
  isSubmitting.value = true
  
  try {
    // In a real application, this would send the response to an API
    // For now, we'll just update the submission status
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
    const index = submissions.findIndex((s: any) => s.id === submission.value.id)
    
    if (index !== -1) {
      submissions[index].status = 'responded'
      submissions[index].response = response.value
      submissions[index].responseDate = new Date().toISOString()
      
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions))
      submission.value = submissions[index]
      response.value = ''
      
      // Show success message or redirect
      alert('Response sent successfully!')
    }
  } catch (error) {
    console.error('Error sending response:', error)
    alert('There was an error sending your response. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const markAsResponded = () => {
  // In a real application, this would update the status via an API
  // For now, we'll just update localStorage
  const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
  const index = submissions.findIndex((s: any) => s.id === submission.value.id)
  
  if (index !== -1) {
    submissions[index].status = 'responded'
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions))
    submission.value = submissions[index]
    
    // Show success message
    alert('Submission marked as responded!')
  }
}

const deleteSubmission = () => {
  if (confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
    // In a real application, this would delete via an API
    // For now, we'll just update localStorage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
    const filtered = submissions.filter((s: any) => s.id !== submission.value.id)
    
    localStorage.setItem('contactSubmissions', JSON.stringify(filtered))
    
    // Redirect back to submissions list
    router.push('/admin/submissions')
  }
}

const exportSubmission = () => {
  // In a real application, this would generate a PDF
  // For now, we'll just show an alert
  alert('PDF export functionality would be implemented here.')
}
</script> 