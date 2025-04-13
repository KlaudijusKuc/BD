<template>
  <div class="min-h-screen bg-black">
    <!-- Header -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/10"></div>
      <div class="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-6 text-white">Kontaktai</h1>
          <p class="text-xl text-gray-200">
            Susisiekite su mūsų komanda, kad aptartumėte savo projektą arba sužinotumėte daugiau apie mūsų paslaugas.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div class="space-y-8">
            <div class="glass-card rounded-xl p-8">
              <h2 class="text-2xl font-display font-bold mb-6 text-white">Susisiekite</h2>
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center">
                    <MapPinIcon class="w-5 h-5 text-purple-300" />
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-white">Būstinės Adresas</h3>
                    <p class="text-gray-300 mt-1">123 Tech Street, Innovation Hub<br>Silicon Valley, CA 94025</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center">
                    <PhoneIcon class="w-5 h-5 text-purple-300" />
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-white">Telefonas</h3>
                    <p class="text-gray-300 mt-1">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center">
                    <EnvelopeIcon class="w-5 h-5 text-purple-300" />
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-white">El. Paštas</h3>
                    <p class="text-gray-300 mt-1">info@e-shop99.com</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center">
                    <ClockIcon class="w-5 h-5 text-purple-300" />
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-white">Darbo Laikas</h3>
                    <p class="text-gray-300 mt-1">Pirmadienis - Penktadienis: 9:00 - 18:00<br>Šeštadienis - Sekmadienis: Uždaryta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="glass-card rounded-xl p-8">
            <ContactForm @submission-success="showSuccessMessage = true" />
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-b from-black via-blue-900/5 to-black"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="glass-card rounded-xl p-8">
          <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <div class="w-full h-full bg-gray-800/50 flex items-center justify-center">
              <p class="text-gray-300">Žemėlapis bus rodomas čia</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Message -->
    <div 
      v-if="showSuccessMessage" 
      class="fixed bottom-4 right-4 bg-green-500/20 text-green-400 px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in"
    >
      <CheckCircleIcon class="w-5 h-5 mr-2" />
      Jūsų žinutė sėkmingai išsiųsta
    </div>
  </div>
</template>

<script setup>
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import { ref, watch } from 'vue'

const showSuccessMessage = ref(false)

// Hide success message after 5 seconds
watch(showSuccessMessage, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)
  }
})
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