<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Darbo Prašymai</h1>
      <p class="text-gray-400">Peržiūrėkite ir tvarkykite gautus darbo prašymus</p>
    </div>

    <!-- Filters -->
    <div class="glass-card p-6 mb-8">
      <div class="grid md:grid-cols-3 gap-4">
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
            <option value="reviewed">Peržiūrėti</option>
            <option value="interviewed">Interviu</option>
            <option value="rejected">Atmesti</option>
            <option value="hired">Priimti</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Pozicija</label>
          <select
            v-model="positionFilter"
            class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Visos Pozicijos</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Full Stack Developer</option>
            <option value="designer">UI/UX Designer</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Applications Table -->
    <div class="glass-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Kandidatas</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Pozicija</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Data</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Statusas</th>
              <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Veiksmai</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-for="application in filteredApplications" :key="application.id" class="hover:bg-gray-800/50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold mr-3">
                    {{ application.name.charAt(0) }}
                  </div>
                  <div>
                    <div class="text-white font-medium">{{ application.name }}</div>
                    <div class="text-gray-400 text-sm">{{ application.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-white">{{ application.position?.title || 'N/A' }}</td>
              <td class="px-6 py-4 text-gray-300">{{ formatDate(application.date) }}</td>
              <td class="px-6 py-4">
                <span :class="getStatusClass(application.status)">
                  {{ getStatusText(application.status) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <button
                    @click="viewApplication(application)"
                    class="text-purple-400 hover:text-purple-300"
                    title="Peržiūrėti"
                  >
                    <EyeIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="updateStatus(application)"
                    class="text-blue-400 hover:text-blue-300"
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
                </div>
              </td>
            </tr>
            <tr v-if="filteredApplications.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-400">
                Paraiškų nerasta
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'admin'
})

const searchQuery = ref('')
const statusFilter = ref('all')
const positionFilter = ref('all')

const applications = ref([])

// Load applications from localStorage on component mount
onMounted(() => {
  const storedApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]')
  applications.value = storedApplications
})

const filteredApplications = computed(() => {
  return applications.value.filter(app => {
    const matchesSearch = searchQuery.value === '' ||
      app.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = statusFilter.value === 'all' || app.status === statusFilter.value
    const matchesPosition = positionFilter.value === 'all' || app.position.toLowerCase().includes(positionFilter.value.toLowerCase())
    
    return matchesSearch && matchesStatus && matchesPosition
  })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('lt-LT')
}

const getStatusClass = (status) => {
  const classes = {
    new: 'px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm',
    reviewed: 'px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm',
    interviewed: 'px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm',
    rejected: 'px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm',
    hired: 'px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm'
  }
  return classes[status] || classes.new
}

const getStatusText = (status) => {
  const texts = {
    new: 'Naujas',
    reviewed: 'Peržiūrėtas',
    interviewed: 'Interviu',
    rejected: 'Atmestas',
    hired: 'Priimtas'
  }
  return texts[status] || 'Naujas'
}

const viewApplication = (application) => {
  // Implement view logic
  console.log('View application:', application)
  // You could navigate to a detail page or show a modal with application details
}

const updateStatus = (application) => {
  // Get current applications
  const currentApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]')
  
  // Find the application to update
  const index = currentApplications.findIndex(app => app.id === application.id)
  
  if (index !== -1) {
    // Toggle status between 'new', 'reviewed', 'interviewed', 'rejected', 'hired'
    const statuses = ['new', 'reviewed', 'interviewed', 'rejected', 'hired']
    const currentStatusIndex = statuses.indexOf(currentApplications[index].status)
    const nextStatusIndex = (currentStatusIndex + 1) % statuses.length
    
    // Update the status
    currentApplications[index].status = statuses[nextStatusIndex]
    
    // Save back to localStorage
    localStorage.setItem('jobApplications', JSON.stringify(currentApplications))
    
    // Update the local ref
    applications.value = currentApplications
  }
}

const deleteApplication = (application) => {
  if (confirm('Ar tikrai norite ištrinti šią paraišką?')) {
    // Get current applications
    const currentApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]')
    
    // Filter out the application to delete
    const updatedApplications = currentApplications.filter(app => app.id !== application.id)
    
    // Save back to localStorage
    localStorage.setItem('jobApplications', JSON.stringify(updatedApplications))
    
    // Update the local ref
    applications.value = updatedApplications
  }
}
</script> 