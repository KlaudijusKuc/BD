<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Pagrindinis Skydelis</h1>
      <p class="text-gray-400">Sveiki atvykę į administravimo skydelį</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="glass-card p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-4">
            <DocumentTextIcon class="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <p class="text-gray-400 text-sm">Viso Paraiškų</p>
            <h3 class="text-2xl font-bold text-white">{{ totalSubmissions }}</h3>
          </div>
        </div>
      </div>

      <div class="glass-card p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/30 to-emerald-500/20 flex items-center justify-center mr-4">
            <CheckCircleIcon class="w-6 h-6 text-green-300" />
          </div>
          <div>
            <p class="text-gray-400 text-sm">Atsakyta Paraiškų</p>
            <h3 class="text-2xl font-bold text-white">{{ respondedSubmissions }}</h3>
          </div>
        </div>
      </div>

      <div class="glass-card p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/30 to-yellow-500/20 flex items-center justify-center mr-4">
            <ClockIcon class="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <p class="text-gray-400 text-sm">Laukiančių Paraiškų</p>
            <h3 class="text-2xl font-bold text-white">{{ pendingSubmissions }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Contact Submissions -->
    <div class="glass-card mb-8">
      <div class="p-6 border-b border-gray-700/50">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-500/20 flex items-center justify-center mr-4">
              <EnvelopeIcon class="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">Naujausios Kontaktinės Paraiškos</h2>
              <p class="text-gray-400">Peržiūrėkite naujausias kontaktines paraiškas</p>
            </div>
          </div>
          <button
            @click="refreshData"
            class="px-4 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
          >
            <ArrowPathIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-700/50">
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-400">Vartotojas</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-400">El. Paštas</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-400">Tema</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-400">Data</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-400">Statusas</th>
              <th class="px-6 py-4 text-right text-sm font-medium text-gray-400">Veiksmai</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700/50">
            <tr v-for="submission in recentContactSubmissions" :key="submission.id" class="hover:bg-gray-800/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/20 flex items-center justify-center mr-3">
                    <span class="text-sm font-medium text-white">{{ submission.name.charAt(0) }}</span>
                  </div>
                  <span class="text-white">{{ submission.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-300">{{ submission.email }}</td>
              <td class="px-6 py-4 text-gray-300">{{ submission.subject }}</td>
              <td class="px-6 py-4 text-gray-300">{{ formatDate(submission.date) }}</td>
              <td class="px-6 py-4">
                <span class="px-3 py-1 rounded-full text-xs font-medium" :class="getStatusClass(submission.status)">
                  {{ getStatusText(submission.status) }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="viewSubmission(submission)"
                    class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                    title="Peržiūrėti"
                  >
                    <EyeIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="updateStatus(submission)"
                    class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                    title="Atnaujinti Statusą"
                  >
                    <PencilIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="deleteSubmission(submission)"
                    class="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors"
                    title="Ištrinti"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="recentContactSubmissions.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-gray-400">
                Kontaktinių paraiškų nerasta
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recent Job Applications -->
    <div class="glass-card">
      <div class="p-6 border-b border-gray-700/50">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-4">
              <BriefcaseIcon class="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">Naujausios Darbo Paraiškos</h2>
              <p class="text-gray-400">Peržiūrėkite naujausias darbo paraiškas</p>
            </div>
          </div>
          <button
            @click="refreshData"
            class="px-4 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
          >
            <ArrowPathIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-700/50">
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-400">Vartotojas</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-400">El. Paštas</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-400">Pozicija</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-400">Data</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-400">Statusas</th>
              <th class="px-6 py-4 text-right text-sm font-medium text-gray-400">Veiksmai</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700/50">
            <tr v-for="submission in recentJobSubmissions" :key="submission.id" class="hover:bg-gray-800/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-3">
                    <span class="text-sm font-medium text-white">{{ submission.name.charAt(0) }}</span>
                  </div>
                  <span class="text-white">{{ submission.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-300">{{ submission.email }}</td>
              <td class="px-6 py-4 text-gray-300">{{ submission.position_title }}</td>
              <td class="px-6 py-4 text-gray-300">{{ formatDate(submission.date) }}</td>
              <td class="px-6 py-4">
                <span class="px-3 py-1 rounded-full text-xs font-medium" :class="getStatusClass(submission.status)">
                  {{ getStatusText(submission.status) }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="viewSubmission(submission)"
                    class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                    title="Peržiūrėti"
                  >
                    <EyeIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="updateStatus(submission)"
                    class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                    title="Atnaujinti Statusą"
                  >
                    <PencilIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="deleteSubmission(submission)"
                    class="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors"
                    title="Ištrinti"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="recentJobSubmissions.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-gray-400">
                Darbo paraiškų nerasta
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- View Submission Modal -->
    <div v-if="selectedSubmission" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="glass-card max-w-2xl w-full mx-4">
        <div class="p-6 border-b border-gray-700/50">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-white">Paraiškos Informacija</h3>
            <button
              @click="selectedSubmission = null"
              class="text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-400">Vardas</p>
              <p class="text-white">{{ selectedSubmission.name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-400">El. Paštas</p>
              <p class="text-white">{{ selectedSubmission.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-400">Data</p>
              <p class="text-white">{{ formatDate(selectedSubmission.date) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-400">Statusas</p>
              <span class="px-3 py-1 rounded-full text-xs font-medium" :class="getStatusClass(selectedSubmission.status)">
                {{ getStatusText(selectedSubmission.status) }}
              </span>
            </div>
            <div v-if="selectedSubmission.type === 'contact'">
              <p class="text-sm text-gray-400">Tema</p>
              <p class="text-white">{{ selectedSubmission.subject }}</p>
            </div>
            <div v-if="selectedSubmission.type === 'job'">
              <p class="text-sm text-gray-400">Pozicija</p>
              <p class="text-white">{{ selectedSubmission.position_title }}</p>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-400">Žinutė</p>
            <p class="text-white whitespace-pre-wrap">
              {{ selectedSubmission.type === 'contact' ? selectedSubmission.message : selectedSubmission.cover_letter }}
            </p>
          </div>
        </div>
        <div class="p-6 border-t border-gray-700/50 flex justify-end space-x-4">
          <button
            @click="selectedSubmission = null"
            class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
          >
            Uždaryti
          </button>
          <button
            @click="updateStatus(selectedSubmission)"
            class="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
          >
            Atnaujinti Statusą
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  EnvelopeIcon,
  BriefcaseIcon
} from '@heroicons/vue/24/outline'

interface _Position {
  id: number
  title: string
  type: string
  location: string
  hours: string
  salary: string
  description: string
}

interface ContactSubmission {
  id: string
  type: 'contact'
  name: string
  email: string
  subject: string
  message: string
  date: string
  status: 'new' | 'pending' | 'responded' | 'rejected'
}

interface JobSubmission {
  id: string
  type: 'job'
  name: string
  email: string
  phone: string
  position_id: string
  position_title: string
  position_type: string
  position_location: string
  cover_letter: string
  cv_filename: string
  date: string
  status: 'new' | 'pending' | 'responded' | 'rejected'
}

type Submission = ContactSubmission | JobSubmission

const API_URL = '/api'

const recentContactSubmissions = ref<ContactSubmission[]>([])
const recentJobSubmissions = ref<JobSubmission[]>([])
const selectedSubmission = ref<Submission | null>(null)
const totalSubmissions = ref(0)
const respondedSubmissions = ref(0)
const pendingSubmissions = ref(0)
const jobApplications = ref<JobSubmission[]>([])
const showSubmissionModal = ref(false)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Define the page meta to use the admin layout
definePageMeta({
  layout: 'admin'
});

const loadData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Load contact submissions from API
    const contactResponse = await fetch(`${API_URL}/contact`)
    if (!contactResponse.ok) {
      throw new Error('Failed to fetch contact submissions')
    }
    const contactData = await contactResponse.json()
    recentContactSubmissions.value = contactData.map((item: any) => ({
      ...item,
      type: 'contact'
    })).sort((a: ContactSubmission, b: ContactSubmission) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    // Load job submissions from API
    const jobResponse = await fetch(`${API_URL}/job-applications`)
    if (!jobResponse.ok) {
      throw new Error('Failed to fetch job applications')
    }
    const jobData = await jobResponse.json()
    recentJobSubmissions.value = jobData.map((item: any) => ({
      ...item,
      type: 'job'
    })).sort((a: JobSubmission, b: JobSubmission) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    // Calculate statistics
    totalSubmissions.value = contactData.length + jobData.length
    respondedSubmissions.value = contactData.filter(s => s.status === 'responded').length + 
                                jobData.filter(s => s.status === 'responded').length
    pendingSubmissions.value = totalSubmissions.value - respondedSubmissions.value
    
    // Update job applications
    jobApplications.value = recentJobSubmissions.value
  } catch (err) {
    console.error('Error loading data:', err)
    error.value = 'Failed to load data. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

// Format date
const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Get status classes
const getStatusClass = (status: Submission['status']): string => {
  switch (status) {
    case 'new':
      return 'bg-blue-100 text-blue-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'responded':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Get status text
const getStatusText = (status: Submission['status']): string => {
  switch (status) {
    case 'new':
      return 'Nauja'
    case 'pending':
      return 'Peržiūrima'
    case 'responded':
      return 'Atsakyta'
    case 'rejected':
      return 'Atmesta'
    default:
      return status
  }
}

// View submission
const viewSubmission = (submission: Submission) => {
  // Simply set the selected submission and show the modal
  selectedSubmission.value = submission
  showSubmissionModal.value = true
}

// Update status
const updateStatus = async (submission: Submission) => {
  const statusOptions = [
    { value: 'new' as const, label: 'Naujas' },
    { value: 'pending' as const, label: 'Laukiama' },
    { value: 'responded' as const, label: 'Atsakyta' },
    { value: 'rejected' as const, label: 'Atmesta' }
  ]
  
  const currentStatusIndex = statusOptions.findIndex(option => option.value === submission.status)
  const nextStatusIndex = (currentStatusIndex + 1) % statusOptions.length
  const newStatus = statusOptions[nextStatusIndex].value
  
  try {
    const endpoint = 'position' in submission ? 'job-applications' : 'contact'
    const response = await fetch(`${API_URL}/${endpoint}/${submission.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
    
    if (!response.ok) {
      throw new Error('Failed to update status')
    }
    
    // Refresh data after successful update
    await loadData()
  } catch (err) {
    console.error('Error updating status:', err)
    error.value = 'Failed to update status. Please try again.'
  }
}

// Delete submission
const deleteSubmission = async (submission: Submission) => {
  if (!confirm('Are you sure you want to delete this submission?')) {
    return
  }
  
  try {
    const endpoint = 'position' in submission ? 'job-applications' : 'contact'
    const response = await fetch(`${API_URL}/${endpoint}/${submission.id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete submission')
    }
    
    // Refresh data after successful deletion
    await loadData()
  } catch (err) {
    console.error('Error deleting submission:', err)
    error.value = 'Failed to delete submission. Please try again.'
  }
}

// Refresh data
const refreshData = () => {
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.glass-card {
  @apply bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 shadow-lg;
}
</style> 