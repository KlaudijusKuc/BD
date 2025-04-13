<template>
  <div>
    <!-- Header -->
    <header class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-md"></div>
      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Mūsų Blogas
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl">
          Naujausios naujienos, patarimai ir įžvalgos apie technologijas, verslą ir inovacijas.
        </p>
      </div>
    </header>

    <!-- Blog Posts -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- Featured Post -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8 text-white">Pagrindinis Straipsnis</h2>
          <div class="glass-card p-6">
            <div class="grid md:grid-cols-2 gap-8">
              <div class="relative h-64 md:h-auto">
                <img
                  src="/images/blog/featured-post.svg"
                  alt="Featured Post"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <div class="flex items-center gap-4 mb-4">
                  <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Technology</span>
                  <span class="text-gray-400 text-sm">March 15, 2024</span>
                </div>
                <h3 class="text-2xl font-bold mb-4 text-white">The Future of E-commerce: AI and Machine Learning</h3>
                <p class="text-gray-300 mb-6">
                  Explore how artificial intelligence and machine learning are transforming the e-commerce landscape,
                  from personalized shopping experiences to automated inventory management.
                </p>
                <NuxtLink
                  to="/blog/future-of-ecommerce"
                  class="inline-flex items-center text-purple-400 hover:text-purple-300"
                >
                  Read More
                  <ArrowRightIcon class="w-4 h-4 ml-2" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Posts -->
        <div>
          <h2 class="text-3xl font-bold mb-8 text-white">Recent Posts</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="post in posts" :key="post.id" class="glass-card">
              <!-- Post Image -->
              <div class="relative aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
                <img :src="post.image" :alt="post.title" class="object-cover w-full h-full">
              </div>
              <!-- Post Content -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-2">{{ post.title }}</h3>
                <p class="text-gray-300 mb-4">{{ post.excerpt }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="text-sm text-gray-400">{{ post.author }}</span>
                  </div>
                  <span class="text-sm text-gray-400">{{ post.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    title: 'Getting Started with Vue 3',
    excerpt: 'Learn the basics of Vue 3 and its composition API...',
    image: '/images/blog/vue3.jpg',
    date: '2024-03-15',
    author: 'John Doe'
  },
  // ... other posts
])
</script> 