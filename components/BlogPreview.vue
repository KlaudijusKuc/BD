<template>
  <section class="py-20 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black"></div>
    <div class="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-display font-bold mb-4 text-white">
          Naujausi iš Mūsų Blogo
        </h2>
        <p class="text-xl text-gray-200 max-w-2xl mx-auto">
          Įžvalgos ir naujienos iš mūsų komandos
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article
          v-for="post in posts"
          :key="post.id"
          class="glass-card rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300"
        >
          <div class="relative h-48 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/10 z-10"></div>
            <img
              :src="post.image"
              :alt="post.title"
              class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute bottom-0 left-0 right-0 p-4 z-20">
              <span class="px-3 py-1 bg-purple-500/30 text-purple-300 rounded-full text-xs font-medium">
                {{ post.category }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center text-sm text-gray-400 mb-4">
              <CalendarIcon class="w-4 h-4 mr-2 text-purple-300" />
              {{ post.date }}
              <span class="mx-2">•</span>
              <UserIcon class="w-4 h-4 mr-2 text-purple-300" />
              {{ post.author }}
            </div>
            <h3 class="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
              <NuxtLink :to="`/blog/${post.slug}`">
                {{ post.title }}
              </NuxtLink>
            </h3>
            <p class="text-gray-300 mb-4">
              {{ post.excerpt }}
            </p>
            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors"
            >
              Skaityti daugiau
              <ArrowRightIcon class="w-4 h-4 ml-2" />
            </NuxtLink>
          </div>
        </article>
      </div>

      <div class="text-center mt-12">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium hover:from-purple-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
        >
          Peržiūrėti Visus Straipsnius
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CalendarIcon, UserIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const posts = [
  {
    id: 1,
    title: 'Debesies kompiuterijos ateitis 2024 metais',
    slug: 'future-of-cloud-computing-2024',
    excerpt: 'Aptariame naujausias tendencijas ir inovacijas, formuojančias debesies kompiuterijos aplinką.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    date: '2024 m. kovas 15',
    author: 'Sara Johnson',
    category: 'Technologijos'
  },
  {
    id: 2,
    title: 'Kibernetinio saugumo geriausios praktikos nuotoliniam darbui',
    slug: 'cybersecurity-best-practices-remote-work',
    excerpt: 'Sužinokite, kaip išlaikyti saugumą dirbant nuotoliniu būdu šiandieninėje skaitmeninėje aplinkoje.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    date: '2024 m. kovas 10',
    author: 'Mikalojus Chen',
    category: 'Saugumas'
  },
  {
    id: 3,
    title: 'Skaitmeninė transformacija: Vadovas mažoms ir vidutinėms įmonėms',
    slug: 'digital-transformation-guide-smes',
    excerpt: 'Praktiniai žingsniai mažoms ir vidutinėms įmonėms, norinčioms priimti skaitmeninę transformaciją.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    date: '2024 m. kovas 5',
    author: 'Eglė Rodriguez',
    category: 'Verslas'
  }
]
</script>

<style scoped>
.glass-card {
  @apply bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg;
}
</style> 