<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Darbo Prašymai</h1>
      <p class="text-gray-400">Peržiūrėkite ir tvarkykite gautus darbo prašymus</p>
    </div>

    <!-- Loading and Error States -->
    <div v-if="isLoading" class="glass-card p-8 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
      <p class="text-gray-300">Kraunami darbo prašymai...</p>
    </div>

    <div v-else-if="error" class="glass-card p-8 text-center">
      <div class="text-red-400 mb-4">
        <ExclamationTriangleIcon class="w-12 h-12 mx-auto" />
      </div>
      <p class="text-gray-300 mb-4">{{ error }}</p>
      <button 
        @click="loadApplications" 
        class="px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg"
      >
        Bandyti dar kartą
      </button>
    </div>

    <div v-else>
      <!-- Filters -->
      <div class="glass-card p-6 mb-8">
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Paieška</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Ieškoti pagal vardą, el. paštą..."
              class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Statusas</label>
            <select
              v-model="statusFilter"
              class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Visi Statusai</option>
              <option value="new">Nauji</option>
              <option value="pending">Laukiama</option>
              <option value="responded">Atsakyta</option>
              <option value="rejected">Atmesti</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Pozicija</label>
            <select
              v-model="positionFilter"
              class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Visos Pozicijos</option>
              <option v-for="position in positions" :key="position" :value="position">
                {{ position }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Applications Table -->
      <div class="glass-card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Kandidatas</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pozicija</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statusas</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Veiksmai</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr v-for="application in filteredApplications" :key="application.id" class="hover:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <span class="text-sm font-medium text-purple-400">{{ application.name.charAt(0) }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-white">{{ application.name }}</div>
                      <div class="text-sm text-gray-400">{{ application.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ application.position_title }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ formatDate(application.date) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getStatusClass(application.status)
                    ]"
                  >
                    {{ getStatusText(application.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="viewApplication(application)"
                    class="text-purple-400 hover:text-purple-300 mr-3"
                    title="Peržiūrėti"
                  >
                    <EyeIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="updateStatus(application)"
                    class="text-blue-400 hover:text-blue-300 mr-3"
                    title="Keisti statusą"
                  >
                    <PencilIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="deleteApplication(application)"
                    class="text-red-400 hover:text-red-300"
                    title="Ištrinti"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </td>
              </tr>
              <tr v-if="filteredApplications.length === 0">
                <td colspan="5" class="px-6 py-4 text-center text-gray-400">
                  Paraiškų nerasta
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Application Details Modal -->
    <div v-if="selectedApplication" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="glass-card max-w-2xl w-full">
        <div class="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 class="text-xl font-bold text-white">Paraiškos Detalės</h3>
          <button @click="selectedApplication = null" class="text-gray-400 hover:text-white">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="p-6 space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Vardas</label>
              <div class="text-white">{{ selectedApplication.name }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">El. Paštas</label>
              <div class="text-white">{{ selectedApplication.email }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Telefonas</label>
              <div class="text-white">{{ selectedApplication.phone }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Pozicija</label>
              <div class="text-white">{{ selectedApplication.position_title }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Pozicijos Tipas</label>
              <div class="text-white">{{ selectedApplication.position_type }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Vieta</label>
              <div class="text-white">{{ selectedApplication.position_location }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Data</label>
              <div class="text-white">{{ formatDate(selectedApplication.date) }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Statusas</label>
              <select
                v-model="selectedApplication.status"
                class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="new">Naujas</option>
                <option value="pending">Laukiama</option>
                <option value="responded">Atsakyta</option>
                <option value="rejected">Atmesta</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Motyvacinis Laiškas</label>
            <div class="text-white whitespace-pre-wrap">{{ selectedApplication.cover_letter }}</div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">CV</label>
            <a 
              :href="`/uploads/cv/${selectedApplication.cv_filename}`" 
              target="_blank"
              class="inline-flex items-center px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg"
            >
              <DocumentIcon class="w-5 h-5 mr-2" />
              Peržiūrėti CV
            </a>
          </div>
        </div>
        <div class="p-6 border-t border-gray-700 flex justify-end space-x-4">
          <button
            @click="selectedApplication = null"
            class="px-4 py-2 text-gray-400 hover:text-white"
          >
            Uždaryti
          </button>
          <button
            @click="saveApplicationChanges"
            class="px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg"
          >
            Išsaugoti Pakeitimus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  EyeIcon, 
  PencilIcon, 
  TrashIcon, 
  XMarkIcon,
  DocumentIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import { useToast } from 'vue-toastification'

definePageMeta({
  layout: 'admin'
})

const toast = useToast()
const API_URL = '/api'

const searchQuery = ref('')
const statusFilter = ref('all')
const positionFilter = ref('all')
const isLoading = ref(true)
const error = ref(null)
const applications = ref([])
const selectedApplication = ref(null)
const positions = ref([])

// Load applications from API on component mount
const loadApplications = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await fetch(`${API_URL}/jobs`)
    if (!response.ok) {
      throw new Error('Failed to fetch job applications')
    }
    
    const jobData = await response.json()
    applications.value = jobData
    
    // Extract unique positions for filter
    const uniquePositions = new Set(jobData.map(app => app.position_title))
    positions.value = Array.from(uniquePositions)
  } catch (err) {
    console.error('Error loading job applications:', err)
    error.value = 'Failed to load job applications. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadApplications()
})

const filteredApplications = computed(() => {
  return applications.value.filter(app => {
    const matchesSearch = searchQuery.value === '' ||
      app.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = statusFilter.value === 'all' || app.status === statusFilter.value
    
    const matchesPosition = positionFilter.value === 'all' || 
      app.position_title === positionFilter.value
    
    return matchesSearch && matchesStatus && matchesPosition
  })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('lt-LT')
}

const getStatusClass = (status) => {
  const classes = {
    new: 'bg-blue-500/20 text-blue-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    responded: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400'
  }
  return classes[status] || classes.new
}

const getStatusText = (status) => {
  const texts = {
    new: 'Naujas',
    pending: 'Laukiama',
    responded: 'Atsakyta',
    rejected: 'Atmesta'
  }
  return texts[status] || 'Naujas'
}

const viewApplication = (application) => {
  selectedApplication.value = application
}

const saveApplicationChanges = async () => {
  try {
    const response = await fetch(`${API_URL}/jobs/${selectedApplication.value.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: selectedApplication.value.status })
    })
    
    if (!response.ok) {
      throw new Error('Failed to update status')
    }
    
    // Update local state
    const index = applications.value.findIndex(app => app.id === selectedApplication.value.id)
    if (index !== -1) {
      applications.value[index].status = selectedApplication.value.status
    }
    
    toast.success('Statusas sėkmingai atnaujintas')
    selectedApplication.value = null
  } catch (err) {
    console.error('Error updating status:', err)
    toast.error('Nepavyko atnaujinti statuso. Bandykite dar kartą.')
  }
}

const updateStatus = async (application) => {
  try {
    const newStatus = application.status === 'new' ? 'pending' : 
                     application.status === 'pending' ? 'responded' : 
                     application.status === 'responded' ? 'rejected' : 'new'
    
    const response = await fetch(`${API_URL}/jobs/${application.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
    
    if (!response.ok) {
      throw new Error('Failed to update status')
    }
    
    // Update local state
    const index = applications.value.findIndex(app => app.id === application.id)
    if (index !== -1) {
      applications.value[index].status = newStatus
    }
    
    // Update selected application if it's the same
    if (selectedApplication.value && selectedApplication.value.id === application.id) {
      selectedApplication.value.status = newStatus
    }
    
    toast.success('Statusas sėkmingai atnaujintas')
  } catch (err) {
    console.error('Error updating status:', err)
    toast.error('Nepavyko atnaujinti statuso. Bandykite dar kartą.')
  }
}

const deleteApplication = async (application) => {
  if (!confirm('Ar tikrai norite ištrinti šią paraišką?')) {
    return
  }
  
  try {
    const response = await fetch(`${API_URL}/jobs/${application.id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete application')
    }
    
    // Update local state
    applications.value = applications.value.filter(app => app.id !== application.id)
    
    // Close modal if the deleted application was selected
    if (selectedApplication.value && selectedApplication.value.id === application.id) {
      selectedApplication.value = null
    }
    
    toast.success('Paraiška sėkmingai ištrinta')
  } catch (err) {
    console.error('Error deleting application:', err)
    toast.error('Nepavyko ištrinti paraiškos. Bandykite dar kartą.')
  }
}
</script> 