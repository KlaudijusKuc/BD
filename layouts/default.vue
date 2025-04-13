<template>
  <div class="min-h-screen bg-black flex flex-col">
    <AppHeader />
    
    <main class="flex-grow pt-20">
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script> 