<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-16">
      <article class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8">{{ post.title }}</h1>
        <div class="mb-8">
          <img :src="post.image" :alt="post.title" class="w-full h-64 object-cover rounded-lg">
        </div>
        <div class="prose prose-invert max-w-none" v-html="post.content"></div>
      </article>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: post } = await useFetch(`/api/blog/${route.params.slug}`);

if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Blog post not found'
  });
}
</script>

<style>
.prose {
  @apply text-gray-300;
}
.prose h2 {
  @apply text-white text-2xl font-bold mt-8 mb-4;
}
.prose p {
  @apply mb-4;
}
.prose ul {
  @apply list-disc list-inside mb-4;
}
.prose a {
  @apply text-blue-400 hover:text-blue-300;
}
</style> 