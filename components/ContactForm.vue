<template>
  <div>
    <h2 class="text-2xl font-display font-bold mb-6 text-white">Siųsti Žinutę</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Vardas</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Jūsų vardas"
        />
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium text-gray-300 mb-2">El. Paštas</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="jūsų@elpaštas.lt"
        />
      </div>
      
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-300 mb-2">Tema</label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          required
          class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Žinutės tema"
        />
      </div>
      
      <div>
        <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Žinutė</label>
        <textarea
          id="message"
          v-model="form.message"
          rows="4"
          required
          class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Jūsų žinutė..."
        ></textarea>
      </div>
      
      <div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
        >
          <span v-if="isSubmitting">Siunčiama...</span>
          <span v-else>Siųsti Žinutę</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submission-success'])

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Submit to API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) {
      throw new Error('Failed to submit message')
    }
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    // Emit success event
    emit('submission-success')
    
  } catch (error) {
    console.error('Error submitting message:', error)
    throw error
  } finally {
    isSubmitting.value = false
  }
}
</script> 