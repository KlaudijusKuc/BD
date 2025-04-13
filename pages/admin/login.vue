<template>
  <div class="min-h-screen bg-black flex items-center justify-center">
    <div class="w-full max-w-md">
      <div class="glass-card rounded-xl p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-display font-bold text-white mb-2">Admin Prisijungimas</h1>
          <p class="text-gray-300">Įveskite prisijungimo duomenis</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-300 mb-1">Vartotojo vardas</label>
            <input 
              id="username" 
              v-model="username" 
              type="text" 
              class="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              placeholder="Įveskite vartotojo vardą"
              required
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Slaptažodis</label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              class="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              placeholder="Įveskite slaptažodį"
              required
            />
          </div>
          
          <div v-if="error" class="text-red-400 text-sm">
            {{ error }}
          </div>
          
          <button 
            type="submit" 
            class="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium hover:from-purple-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Prisijungiama...</span>
            <span v-else>Prisijungti</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = () => {
  isLoading.value = true
  error.value = ''
  
  // Simple authentication check
  setTimeout(() => {
    if (username.value === 'admin' && password.value === 'admin') {
      // Store authentication state
      localStorage.setItem('adminAuthenticated', 'true')
      // Redirect to admin dashboard
      navigateTo('/admin')
    } else {
      error.value = 'Neteisingas vartotojo vardas arba slaptažodis'
      isLoading.value = false
    }
  }, 500) // Simulate network delay
}
</script>

<style scoped>
.glass-card {
  @apply bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg;
}
</style> 