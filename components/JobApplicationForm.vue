<template>
  <form @submit.prevent="submitApplication" class="space-y-6">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-300">Vardas Pavardė</label>
      <input
        type="text"
        id="name"
        v-model="form.name"
        required
        class="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-300">El. Paštas</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        required
        class="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
      />
    </div>

    <div>
      <label for="phone" class="block text-sm font-medium text-gray-300">Telefono Numeris</label>
      <input
        type="tel"
        id="phone"
        v-model="form.phone"
        required
        class="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
      />
    </div>

    <div>
      <label for="position" class="block text-sm font-medium text-gray-300">Pozicija</label>
      <select
        id="position"
        v-model="form.position"
        required
        class="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
      >
        <option value="">Pasirinkite poziciją</option>
        <option v-for="position in positions" :key="position.id" :value="position.id">
          {{ position.title }}
        </option>
      </select>
    </div>

    <div>
      <label for="experience" class="block text-sm font-medium text-gray-300">Patirtis</label>
      <textarea
        id="experience"
        v-model="form.experience"
        rows="4"
        required
        class="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
      ></textarea>
    </div>

    <div>
      <label for="resume" class="block text-sm font-medium text-gray-300">CV (PDF)</label>
      <input
        type="file"
        id="resume"
        @change="handleFileUpload"
        accept=".pdf"
        required
        class="mt-1 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-500 file:text-white hover:file:bg-purple-400"
      />
    </div>

    <div>
      <label for="coverLetter" class="block text-sm font-medium text-gray-300">Motyvacinis Laiškas</label>
      <textarea
        id="coverLetter"
        v-model="form.coverLetter"
        rows="4"
        class="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
      ></textarea>
    </div>

    <div>
      <button
        type="submit"
        class="w-full btn-primary"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Siunčiama...' : 'Pateikti Paraišką' }}
      </button>
    </div>

    <!-- Status Message -->
    <div v-if="statusMessage" :class="['p-4 rounded-lg', statusMessage.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300']">
      {{ statusMessage.text }}
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const positions = [
  { id: 'frontend-dev', title: 'Frontend Developer' },
  { id: 'backend-dev', title: 'Backend Developer' },
  { id: 'fullstack-dev', title: 'Full Stack Developer' },
  { id: 'ui-designer', title: 'UI Designer' },
  { id: 'project-manager', title: 'Project Manager' }
]

const form = reactive({
  name: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  resume: null,
  coverLetter: ''
})

const isSubmitting = ref(false)
const statusMessage = ref(null)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    form.resume = file
  } else {
    event.target.value = ''
    alert('Prašome įkelti PDF failą')
  }
}

const submitApplication = async () => {
  isSubmitting.value = true
  statusMessage.value = null

  try {
    // Create application object
    const application = {
      ...form,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'new'
    }

    // Get existing applications from localStorage
    const existingApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]')
    
    // Add new application
    existingApplications.push(application)
    
    // Save back to localStorage
    localStorage.setItem('jobApplications', JSON.stringify(existingApplications))

    // Reset form
    Object.keys(form).forEach(key => {
      if (key !== 'resume') {
        form[key] = ''
      }
    })
    form.resume = null

    statusMessage.value = {
      type: 'success',
      text: 'Jūsų paraiška sėkmingai pateikta!'
    }
  } catch (error) {
    statusMessage.value = {
      type: 'error',
      text: 'Įvyko klaida. Bandykite dar kartą.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.btn-primary {
  @apply inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium hover:from-purple-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed;
}
</style> 