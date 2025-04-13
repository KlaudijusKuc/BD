<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Kontaktinės Paraiškos</h1>
      <p class="text-gray-400">Valdykite kontaktines paraiškas ir žinutes</p>
    </div>

    <!-- Filters -->
    <div class="glass-card p-6 mb-8">
      <div class="grid md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Paieška</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Ieškoti pagal vardą arba el. paštą..."
            class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Statusas</label>
          <select
            v-model="statusFilter"
            class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Visi</option>
            <option value="new">Nauji</option>
            <option value="reviewed">Peržiūrėti</option>
            <option value="responded">Atsakyta</option>
            <option value="archived">Archyvuoti</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Rūšiavimas</label>
          <select
            v-model="sortBy"
            class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="newest">Naujausi</option>
            <option value="oldest">Seniausi</option>
            <option value="name">Pagal vardą</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Submissions Table -->
    <div class="glass-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Vartotojas</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">El. Paštas</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tema</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statusas</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Veiksmai</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-for="submission in filteredSubmissions" :key="submission.id" class="hover:bg-gray-800/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <span class="text-sm font-medium text-purple-400">{{ submission.name.charAt(0) }}</span>
                  </div>
                  <div class="text-sm font-medium text-white">{{ submission.name }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ submission.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ submission.subject }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ formatDate(submission.date) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getStatusClasses(submission.status)
                  ]"
                >
                  {{ getStatusText(submission.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="viewSubmission(submission)"
                  class="text-purple-400 hover:text-purple-300 mr-3"
                  title="Peržiūrėti"
                >
                  <EyeIcon class="w-5 h-5" />
                </button>
                <button
                  @click="updateStatus(submission)"
                  class="text-blue-400 hover:text-blue-300 mr-3"
                  title="Atnaujinti statusą"
                >
                  <PencilIcon class="w-5 h-5" />
                </button>
                <button
                  @click="deleteSubmission(submission)"
                  class="text-red-400 hover:text-red-300"
                  title="Ištrinti"
                >
                  <TrashIcon class="w-5 h-5" />
                </button>
              </td>
            </tr>
            <tr v-if="filteredSubmissions.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-400">
                Paraiškų nerasta
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- View Submission Modal -->
    <div v-if="selectedSubmission" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="glass-card max-w-2xl w-full">
        <div class="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 class="text-xl font-bold text-white">Paraiškos Detalės</h3>
          <button @click="selectedSubmission = null" class="text-gray-400 hover:text-white">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="p-6 space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Vardas</label>
              <div class="text-white">{{ selectedSubmission.name }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">El. Paštas</label>
              <div class="text-white">{{ selectedSubmission.email }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Tema</label>
              <div class="text-white">{{ selectedSubmission.subject }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Data</label>
              <div class="text-white">{{ formatDate(selectedSubmission.date) }}</div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Žinutė</label>
            <div class="text-white whitespace-pre-wrap">{{ selectedSubmission.message }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Statusas</label>
            <select
              v-model="selectedSubmission.status"
              class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="new">Naujas</option>
              <option value="reviewed">Peržiūrėtas</option>
              <option value="responded">Atsakytas</option>
              <option value="archived">Archyvuotas</option>
            </select>
          </div>
        </div>
        <div class="p-6 border-t border-gray-700 flex justify-end space-x-4">
          <button
            @click="selectedSubmission = null"
            class="px-4 py-2 text-gray-400 hover:text-white"
          >
            Uždaryti
          </button>
          <button
            @click="saveSubmissionChanges"
            class="px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg"
          >
            Išsaugoti Pakeitimus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Define the page meta to use the admin layout
definePageMeta({
  layout: 'admin'
})

const submissions = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const sortBy = ref('newest')
const selectedSubmission = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Fetch submissions from API
const fetchSubmissions = async () => {
  try {
    isLoading.value = true
    const response = await fetch('/api/contact')
    if (!response.ok) {
      throw new Error('Failed to fetch submissions')
    }
    submissions.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Error fetching submissions:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchSubmissions()
})

const filteredSubmissions = computed(() => {
  let result = [...submissions.value]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(submission => 
      submission.name.toLowerCase().includes(query) ||
      submission.email.toLowerCase().includes(query)
    )
  }
  
  // Apply status filter
  if (statusFilter.value) {
    result = result.filter(submission => submission.status === statusFilter.value)
  }
  
  // Apply sorting
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return new Date(a.date) - new Date(b.date)
      case 'name':
        return a.name.localeCompare(b.name)
      default: // newest
        return new Date(b.date) - new Date(a.date)
    }
  })
  
  return result
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClasses = (status) => {
  switch (status) {
    case 'new':
      return 'bg-blue-500/20 text-blue-400'
    case 'reviewed':
      return 'bg-yellow-500/20 text-yellow-400'
    case 'responded':
      return 'bg-green-500/20 text-green-400'
    case 'archived':
      return 'bg-gray-500/20 text-gray-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'new':
      return 'Naujas'
    case 'reviewed':
      return 'Peržiūrėtas'
    case 'responded':
      return 'Atsakytas'
    case 'archived':
      return 'Archyvuotas'
    default:
      return status
  }
}

const viewSubmission = (submission) => {
  selectedSubmission.value = { ...submission }
}

const updateStatus = async (submission) => {
  try {
    const response = await fetch(`/api/contact/${submission.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: submission.status })
    })
    
    if (!response.ok) {
      throw new Error('Failed to update status')
    }
    
    await fetchSubmissions() // Refresh the list
  } catch (err) {
    console.error('Error updating status:', err)
    alert('Failed to update status')
  }
}

const deleteSubmission = async (submission) => {
  if (confirm('Ar tikrai norite ištrinti šią paraišką?')) {
    try {
      const response = await fetch(`/api/contact/${submission.id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete submission')
      }
      
      await fetchSubmissions() // Refresh the list
    } catch (err) {
      console.error('Error deleting submission:', err)
      alert('Failed to delete submission')
    }
  }
}

const saveSubmissionChanges = async () => {
  try {
    const response = await fetch(`/api/contact/${selectedSubmission.value.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: selectedSubmission.value.status })
    })
    
    if (!response.ok) {
      throw new Error('Failed to update submission')
    }
    
    await fetchSubmissions() // Refresh the list
    selectedSubmission.value = null
  } catch (err) {
    console.error('Error saving changes:', err)
    alert('Failed to save changes')
  }
}
</script> 