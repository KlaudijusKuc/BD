<template>
  <div>
    <header class="mb-8">
      <h1 class="text-2xl font-display font-bold text-white">Job Applications</h1>
    </header>

    <!-- Filters -->
    <div class="glass-card p-6 mb-8">
      <div class="grid md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, email, or position..."
            class="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Position</label>
          <select
            v-model="positionFilter"
            class="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">All Positions</option>
            <option v-for="position in positions" :key="position.id" :value="position.id">
              {{ position.title }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
          <select
            v-model="statusFilter"
            class="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="interviewed">Interviewed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Applications Table -->
    <div class="glass-card overflow-hidden">
      <table class="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th 
              v-for="header in tableHeaders" 
              :key="header.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
              @click="sortBy(header.key)"
            >
              {{ header.label }}
              <span v-if="sortField === header.key" class="ml-1">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="application in filteredApplications" :key="application.id" class="hover:bg-gray-800/50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div>
                  <div class="text-sm font-medium text-white">{{ application.name }}</div>
                  <div class="text-sm text-gray-300">{{ application.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">{{ getPositionTitle(application.position) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  getStatusClass(application.status)
                ]"
              >
                {{ application.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
              {{ formatDate(application.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                @click="viewApplication(application)"
                class="text-purple-400 hover:text-purple-300 mr-4"
              >
                View
              </button>
              <button 
                @click="updateStatus(application)"
                class="text-blue-400 hover:text-blue-300"
              >
                Update Status
              </button>
            </td>
          </tr>
          <tr v-if="filteredApplications.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-gray-300">
              No applications found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- View Application Modal -->
    <div v-if="selectedApplication" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div class="glass-card max-w-2xl w-full p-8">
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-xl font-display font-bold text-white">Application Details</h2>
          <button @click="selectedApplication = null" class="text-gray-400 hover:text-white">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium text-gray-300">Personal Information</h3>
            <div class="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-400">Name</p>
                <p class="text-white">{{ selectedApplication.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Email</p>
                <p class="text-white">{{ selectedApplication.email }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Phone</p>
                <p class="text-white">{{ selectedApplication.phone }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-400">Position</p>
                <p class="text-white">{{ getPositionTitle(selectedApplication.position) }}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-300">Experience</h3>
            <p class="mt-2 text-white whitespace-pre-line">{{ selectedApplication.experience }}</p>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-300">Cover Letter</h3>
            <p class="mt-2 text-white whitespace-pre-line">{{ selectedApplication.coverLetter }}</p>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-300">Resume</h3>
            <p class="mt-2 text-white">{{ selectedApplication.resume?.name || 'No file uploaded' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Status Modal -->
    <div v-if="showStatusModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div class="glass-card max-w-md w-full p-8">
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-xl font-display font-bold text-white">Update Status</h2>
          <button @click="showStatusModal = false" class="text-gray-400 hover:text-white">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">New Status</label>
            <select
              v-model="newStatus"
              class="w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="interviewed">Interviewed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div class="flex justify-end space-x-4">
            <button 
              @click="showStatusModal = false"
              class="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button 
              @click="saveStatus"
              class="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const positions = [
  { id: 'frontend-dev', title: 'Frontend Developer' },
  { id: 'backend-dev', title: 'Backend Developer' },
  { id: 'fullstack-dev', title: 'Full Stack Developer' },
  { id: 'ui-designer', title: 'UI Designer' },
  { id: 'project-manager', title: 'Project Manager' }
]

const tableHeaders = [
  { key: 'name', label: 'Applicant' },
  { key: 'position', label: 'Position' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' }
]

const applications = ref([])
const searchQuery = ref('')
const positionFilter = ref('')
const statusFilter = ref('')
const sortField = ref('date')
const sortDirection = ref('desc')
const selectedApplication = ref(null)
const showStatusModal = ref(false)
const newStatus = ref('')
const applicationToUpdate = ref(null)

const filteredApplications = computed(() => {
  let filtered = [...applications.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(app => 
      app.name.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query) ||
      getPositionTitle(app.position).toLowerCase().includes(query)
    )
  }

  // Apply position filter
  if (positionFilter.value) {
    filtered = filtered.filter(app => app.position === positionFilter.value)
  }

  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(app => app.status === statusFilter.value)
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue = a[sortField.value]
    let bValue = b[sortField.value]

    if (sortField.value === 'position') {
      aValue = getPositionTitle(a.position)
      bValue = getPositionTitle(b.position)
    }

    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return filtered
})

onMounted(() => {
  // Load applications from localStorage
  const storedApplications = localStorage.getItem('jobApplications')
  if (storedApplications) {
    applications.value = JSON.parse(storedApplications)
  }
})

const getPositionTitle = (positionId) => {
  const position = positions.find(p => p.id === positionId)
  return position ? position.title : positionId
}

const getStatusClass = (status) => {
  const classes = {
    new: 'bg-blue-500/20 text-blue-300',
    reviewed: 'bg-purple-500/20 text-purple-300',
    interviewed: 'bg-green-500/20 text-green-300',
    rejected: 'bg-red-500/20 text-red-300'
  }
  return classes[status] || 'bg-gray-500/20 text-gray-300'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const viewApplication = (application) => {
  selectedApplication.value = application
}

const updateStatus = (application) => {
  applicationToUpdate.value = application
  newStatus.value = application.status
  showStatusModal.value = true
}

const saveStatus = () => {
  if (applicationToUpdate.value && newStatus.value) {
    const index = applications.value.findIndex(app => app.id === applicationToUpdate.value.id)
    if (index !== -1) {
      applications.value[index].status = newStatus.value
      localStorage.setItem('jobApplications', JSON.stringify(applications.value))
    }
  }
  showStatusModal.value = false
  applicationToUpdate.value = null
  newStatus.value = ''
}
</script>

<style scoped>
.btn-primary {
  @apply inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium hover:from-purple-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30;
}
</style> 