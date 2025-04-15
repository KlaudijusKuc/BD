<template>
  <section class="py-20 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black"></div>
    <div class="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-display font-bold mb-4 text-white">Ką Sako Mūsų Klientai</h2>
        <p class="text-xl text-gray-200 max-w-2xl mx-auto">
          Sužinokite, ką mūsų klientai sako apie mūsų paslaugas ir bendradarbiavimą
        </p>
      </div>

      <div class="relative max-w-4xl mx-auto">
        <!-- Carousel Component -->
        <ClientOnly>
          <Carousel
            :items-to-show="1"
            :wrap-around="true"
            :autoplay="5000"
            :pauseAutoplayOnHover="true"
            class="testimonials-carousel"
          >
            <Slide v-for="testimonial in testimonials" :key="testimonial.id">
              <div class="glass-card rounded-xl p-8 mx-4">
                <div class="flex flex-col items-center text-center">
                  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mb-6">
                    <img :src="testimonial.avatar" :alt="testimonial.name" class="w-16 h-16 rounded-full object-cover" />
                  </div>
                  <div class="flex mb-4">
                    <StarIcon v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" />
                  </div>
                  <blockquote class="text-xl text-gray-200 mb-6 italic max-w-2xl">
                    "{{ testimonial.quote }}"
                  </blockquote>
                  <div class="flex items-center justify-center">
                    <ChatBubbleLeftIcon class="w-6 h-6 text-purple-300 mr-2" />
                    <div>
                      <p class="text-white font-medium">{{ testimonial.name }}</p>
                      <p class="text-purple-300">{{ testimonial.position }}, {{ testimonial.company }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Slide>

            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </ClientOnly>

        <!-- Fallback for SSR or when carousel fails to load -->
        <div v-if="!isClient" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="testimonial in testimonials.slice(0, 3)" :key="testimonial.id" class="glass-card rounded-xl p-6">
            <div class="flex flex-col items-center text-center">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mb-4">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover" />
              </div>
              <div class="flex mb-3">
                <StarIcon v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400" />
              </div>
              <blockquote class="text-lg text-gray-200 mb-4 italic">
                "{{ testimonial.quote }}"
              </blockquote>
              <div class="flex items-center justify-center">
                <ChatBubbleLeftIcon class="w-5 h-5 text-purple-300 mr-2" />
                <div>
                  <p class="text-white font-medium text-sm">{{ testimonial.name }}</p>
                  <p class="text-purple-300 text-sm">{{ testimonial.position }}, {{ testimonial.company }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'

const isClient = ref(false)

onMounted(() => {
  isClient.value = true
})

const testimonials = [
  {
    id: 1,
    name: 'Laura Kazlauskaitė',
    position: 'Verslo Direktorė',
    company: 'TechStart LT',
    avatar: '/images/testimonials/avatar-1.svg',
    quote: 'e-shop99 komanda padėjo mums transformuoti mūsų verslą į skaitmeninę erą. Jų inovatyvūs sprendimai ir profesionalus požiūris viršijo mūsų lūkesčius.'
  },
  {
    id: 2,
    name: 'Marius Jankauskas',
    position: 'CTO',
    company: 'Inovacijos Group',
    avatar: '/images/testimonials/avatar-2.svg',
    quote: 'Bendradarbiavimas su e-shop99 buvo išskirtinė patirtis. Jų techninė ekspertizė ir nuolatinis dėmesys kokybei padėjo mums sukurti produktą, kuris dominuoja rinkoje.'
  },
  {
    id: 3,
    name: 'Eglė Petrauskienė',
    position: 'Marketingo Vadovė',
    company: 'Digital Solutions',
    avatar: '/images/testimonials/avatar-3.svg',
    quote: 'e-shop99 skaitmeninio marketingo strategijos padėjo mums pasiekti neįtikėtinų rezultatų. Jų komanda visada atsako į mūsų poreikius ir siūlo inovatyvius sprendimus.'
  }
]
</script> 