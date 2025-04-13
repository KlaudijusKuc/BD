<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold mb-12">Blog</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article v-for="post in posts" :key="post.slug" class="bg-gray-800 rounded-lg overflow-hidden">
          <NuxtLink :to="`/blog/${post.slug}`">
            <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
              <p class="text-gray-400 mb-4">{{ post.excerpt }}</p>
              <div class="flex items-center text-sm text-gray-500">
                <span>{{ new Date(post.date).toLocaleDateString() }}</span>
                <span class="mx-2">•</span>
                <span>{{ post.readingTime }} min read</span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const posts = ref([
  {
    slug: 'future-of-cloud-computing-2024',
    title: 'The Future of Cloud Computing in 2024',
    excerpt: 'Explore the latest trends and innovations shaping cloud computing in 2024.',
    image: '/images/blog/cloud-computing.jpg',
    date: '2024-04-01',
    readingTime: 5
  },
  {
    slug: 'cybersecurity-best-practices-remote-work',
    title: 'Cybersecurity Best Practices for Remote Work',
    excerpt: 'Essential security measures for protecting your remote workforce.',
    image: '/images/blog/cybersecurity.jpg',
    date: '2024-03-28',
    readingTime: 4
  },
  {
    slug: 'digital-transformation-guide-smes',
    title: 'Digital Transformation Guide for SMEs',
    excerpt: 'A comprehensive guide to digital transformation for small and medium enterprises.',
    image: '/images/blog/digital-transformation.jpg',
    date: '2024-03-25',
    readingTime: 6
  }
]);
</script> 