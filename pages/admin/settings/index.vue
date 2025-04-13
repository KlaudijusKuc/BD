<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Nustatymai</h1>
      <p class="text-gray-400">Valdykite svetainės nustatymus ir konfigūraciją</p>
    </div>

    <!-- Settings Form -->
    <form @submit.prevent="saveSettings" class="space-y-8">
      <!-- General Settings -->
      <div class="glass-card p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-4">
            <Cog6ToothIcon class="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">Bendri Nustatymai</h2>
            <p class="text-gray-400">Pagrindiniai svetainės nustatymai</p>
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Svetainės Pavadinimas</label>
            <input
              v-model="settings.siteName"
              type="text"
              :class="[
                'w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500',
                errors.siteName ? 'border-red-500' : 'border-gray-700'
              ]"
              placeholder="Įveskite svetainės pavadinimą"
            />
            <p v-if="errors.siteName" class="mt-1 text-sm text-red-500">{{ errors.siteName }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">El. Paštas</label>
            <input
              v-model="settings.email"
              type="email"
              :class="[
                'w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500',
                errors.email ? 'border-red-500' : 'border-gray-700'
              ]"
              placeholder="Įveskite el. paštą"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Telefonas</label>
            <input
              v-model="settings.phone"
              type="tel"
              :class="[
                'w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500',
                errors.phone ? 'border-red-500' : 'border-gray-700'
              ]"
              placeholder="Įveskite telefono numerį"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Adresas</label>
            <input
              v-model="settings.address"
              type="text"
              :class="[
                'w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500',
                errors.address ? 'border-red-500' : 'border-gray-700'
              ]"
              placeholder="Įveskite adresą"
            />
            <p v-if="errors.address" class="mt-1 text-sm text-red-500">{{ errors.address }}</p>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-300 mb-2">Svetainės Aprašymas</label>
            <textarea
              v-model="settings.description"
              rows="3"
              :class="[
                'w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500',
                errors.description ? 'border-red-500' : 'border-gray-700'
              ]"
              placeholder="Įveskite svetainės aprašymą"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-500">{{ errors.description }}</p>
          </div>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="glass-card p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-4">
            <BellIcon class="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">Pranešimų Nustatymai</h2>
            <p class="text-gray-400">Valdykite pranešimų gavimo nustatymus</p>
          </div>
        </div>
        
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-white font-medium">El. Pašto Pranešimai</h3>
              <p class="text-gray-400 text-sm">Gauti pranešimus el. paštu</p>
            </div>
            <button
              type="button"
              @click="settings.emailNotifications = !settings.emailNotifications"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                settings.emailNotifications ? 'bg-purple-500' : 'bg-gray-700'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-white font-medium">Darbo Prašymų Pranešimai</h3>
              <p class="text-gray-400 text-sm">Gauti pranešimus apie naujus darbo prašymus</p>
            </div>
            <button
              type="button"
              @click="settings.jobNotifications = !settings.jobNotifications"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                settings.jobNotifications ? 'bg-purple-500' : 'bg-gray-700'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  settings.jobNotifications ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-white font-medium">Kontaktinių Paraiškų Pranešimai</h3>
              <p class="text-gray-400 text-sm">Gauti pranešimus apie naujas kontaktines paraiškas</p>
            </div>
            <button
              type="button"
              @click="settings.contactNotifications = !settings.contactNotifications"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                settings.contactNotifications ? 'bg-purple-500' : 'bg-gray-700'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  settings.contactNotifications ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Pranešimų Dažnumas</label>
            <select
              v-model="settings.notificationFrequency"
              :class="[
                'w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500',
                errors.notificationFrequency ? 'border-red-500' : 'border-gray-700'
              ]"
            >
              <option value="instant">Iš karto</option>
              <option value="daily">Kasdien</option>
              <option value="weekly">Kas savaitę</option>
            </select>
            <p v-if="errors.notificationFrequency" class="mt-1 text-sm text-red-500">{{ errors.notificationFrequency }}</p>
          </div>
        </div>
      </div>

      <!-- Social Media Settings -->
      <div class="glass-card p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-4">
            <ShareIcon class="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">Socialinių Tinklų Nustatymai</h2>
            <p class="text-gray-400">Valdykite socialinių tinklų nuorodas</p>
          </div>
        </div>
        
        <div class="space-y-6">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 rounded-lg bg-[#1877F2]/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
              <input
                v-model="settings.socialMedia.facebook"
                type="url"
                :class="[
                  'w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500',
                  errors.socialMedia?.facebook ? 'border-red-500' : 'border-gray-700'
                ]"
                placeholder="https://facebook.com/..."
              />
              <p v-if="errors.socialMedia?.facebook" class="mt-1 text-sm text-red-500">{{ errors.socialMedia.facebook }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 rounded-lg bg-[#1DA1F2]/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
              <input
                v-model="settings.socialMedia.twitter"
                type="url"
                :class="[
                  'w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500',
                  errors.socialMedia?.twitter ? 'border-red-500' : 'border-gray-700'
                ]"
                placeholder="https://twitter.com/..."
              />
              <p v-if="errors.socialMedia?.twitter" class="mt-1 text-sm text-red-500">{{ errors.socialMedia.twitter }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 rounded-lg bg-[#E4405F]/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#E4405F]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
              <input
                v-model="settings.socialMedia.instagram"
                type="url"
                :class="[
                  'w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500',
                  errors.socialMedia?.instagram ? 'border-red-500' : 'border-gray-700'
                ]"
                placeholder="https://instagram.com/..."
              />
              <p v-if="errors.socialMedia?.instagram" class="mt-1 text-sm text-red-500">{{ errors.socialMedia.instagram }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 rounded-lg bg-[#0A66C2]/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
              <input
                v-model="settings.socialMedia.linkedin"
                type="url"
                :class="[
                  'w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500',
                  errors.socialMedia?.linkedin ? 'border-red-500' : 'border-gray-700'
                ]"
                placeholder="https://linkedin.com/..."
              />
              <p v-if="errors.socialMedia?.linkedin" class="mt-1 text-sm text-red-500">{{ errors.socialMedia.linkedin }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Appearance Settings -->
      <div class="glass-card p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-4">
            <PaintBrushIcon class="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">Išvaizdos Nustatymai</h2>
            <p class="text-gray-400">Valdykite svetainės išvaizdą</p>
          </div>
        </div>
        
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-white font-medium">Tamsus Režimas</h3>
              <p class="text-gray-400 text-sm">Įjungti tamsų režimą</p>
            </div>
            <button
              type="button"
              @click="settings.darkMode = !settings.darkMode"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
                settings.darkMode ? 'bg-purple-500' : 'bg-gray-700'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  settings.darkMode ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Temos Spalva</label>
            <div class="grid grid-cols-5 gap-4">
              <button
                v-for="color in themeColors"
                :key="color.value"
                type="button"
                @click="settings.themeColor = color.value"
                :class="[
                  'w-10 h-10 rounded-lg border-2 transition-all',
                  settings.themeColor === color.value
                    ? 'border-white scale-110'
                    : 'border-transparent hover:scale-105'
                ]"
                :style="{ backgroundColor: color.value }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="resetSettings"
          class="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
        >
          Atstatyti Nustatymus
        </button>
        <button
          type="submit"
          :disabled="isLoading"
          class="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Išsaugoma...
          </span>
          <span v-else>Išsaugoti Nustatymus</span>
        </button>
      </div>
    </form>

    <!-- Success Toast -->
    <div
      v-if="showSuccessToast"
      class="fixed bottom-4 right-4 bg-green-500/20 text-green-400 px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in"
    >
      <CheckCircleIcon class="w-5 h-5 mr-2" />
      Nustatymai sėkmingai išsaugoti
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import {
  Cog6ToothIcon,
  BellIcon,
  ShareIcon,
  PaintBrushIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'admin'
})

// Default settings
const defaultSettings = {
  siteName: 'e-shop99',
  email: 'info@e-shop99.lt',
  phone: '+370 600 00000',
  address: 'Vilnius, Lietuva',
  description: 'Modernūs technologiniai sprendimai jūsų verslui',
  emailNotifications: true,
  jobNotifications: true,
  contactNotifications: true,
  notificationFrequency: 'instant',
  socialMedia: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  },
  darkMode: true,
  themeColor: '#6366F1'
}

const settings = ref({ ...defaultSettings })
const showSuccessToast = ref(false)
const isLoading = ref(false)
const errors = ref({})

const themeColors = [
  { value: '#6366F1', name: 'Indigo' },
  { value: '#EC4899', name: 'Pink' },
  { value: '#F59E0B', name: 'Amber' },
  { value: '#10B981', name: 'Emerald' },
  { value: '#3B82F6', name: 'Blue' }
]

// Validate settings
const validateSettings = () => {
  errors.value = {}
  
  if (!settings.value.siteName) {
    errors.value.siteName = 'Svetainės pavadinimas yra privalomas'
  }
  
  if (!settings.value.email) {
    errors.value.email = 'El. paštas yra privalomas'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.value.email)) {
    errors.value.email = 'Neteisingas el. pašto formatas'
  }
  
  if (settings.value.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(settings.value.phone)) {
    errors.value.phone = 'Neteisingas telefono numerio formatas'
  }
  
  // Validate social media URLs
  if (settings.value.socialMedia.facebook && !isValidUrl(settings.value.socialMedia.facebook)) {
    errors.value.socialMedia = { ...errors.value.socialMedia, facebook: 'Neteisingas URL formatas' }
  }
  
  if (settings.value.socialMedia.twitter && !isValidUrl(settings.value.socialMedia.twitter)) {
    errors.value.socialMedia = { ...errors.value.socialMedia, twitter: 'Neteisingas URL formatas' }
  }
  
  if (settings.value.socialMedia.instagram && !isValidUrl(settings.value.socialMedia.instagram)) {
    errors.value.socialMedia = { ...errors.value.socialMedia, instagram: 'Neteisingas URL formatas' }
  }
  
  if (settings.value.socialMedia.linkedin && !isValidUrl(settings.value.socialMedia.linkedin)) {
    errors.value.socialMedia = { ...errors.value.socialMedia, linkedin: 'Neteisingas URL formatas' }
  }
  
  return Object.keys(errors.value).length === 0
}

// Helper function to validate URLs
const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

// Apply settings to the site
const applySettings = () => {
  // Apply theme color
  document.documentElement.style.setProperty('--primary-color', settings.value.themeColor)
  
  // Apply dark mode
  if (settings.value.darkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  
  // Update site title
  document.title = settings.value.siteName
  
  // Store settings in localStorage for other components to access
  localStorage.setItem('siteSettings', JSON.stringify(settings.value))
}

// Load settings from localStorage
onMounted(() => {
  const savedSettings = localStorage.getItem('adminSettings')
  if (savedSettings) {
    try {
      const parsedSettings = JSON.parse(savedSettings)
      settings.value = { ...defaultSettings, ...parsedSettings }
      applySettings()
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  } else {
    // If no settings exist, save defaults
    localStorage.setItem('adminSettings', JSON.stringify(defaultSettings))
    localStorage.setItem('siteSettings', JSON.stringify(defaultSettings))
    applySettings()
  }
})

// Watch for theme color changes
watch(() => settings.value.themeColor, (newColor) => {
  document.documentElement.style.setProperty('--primary-color', newColor)
})

// Watch for dark mode changes
watch(() => settings.value.darkMode, (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

// Save settings to localStorage
const saveSettings = async () => {
  if (!validateSettings()) {
    return
  }
  
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    localStorage.setItem('adminSettings', JSON.stringify(settings.value))
    applySettings()
    
    showSuccessToast.value = true
    setTimeout(() => {
      showSuccessToast.value = false
    }, 3000)
  } catch (_err) {
    // Show error message
    const toast = document.createElement('div')
    toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
    toast.textContent = 'An error occurred while saving settings. Please try again.'
    document.body.appendChild(toast)
    setTimeout(() => {
      toast.remove()
    }, 3000)
  } finally {
    isLoading.value = false
  }
}

// Reset settings to defaults
const resetSettings = () => {
  if (confirm('Ar tikrai norite atstatyti nustatymus į pradinę būseną?')) {
    settings.value = { ...defaultSettings }
    localStorage.removeItem('adminSettings')
    localStorage.setItem('adminSettings', JSON.stringify(defaultSettings))
    applySettings()
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 