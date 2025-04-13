<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 via-navy-900 to-gray-900 flex flex-col">
    <AppHeader />
    
    <main class="flex-grow pt-20">
      <Toast />
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import Toast from '~/components/Toast.vue'
</script>

<style>
:root {
  --color-navy-900: #0a192f;
  --color-navy-800: #112240;
  --color-navy-700: #1d3461;
  --color-navy-600: #2a4365;
}

.bg-navy-900 {
  background-color: var(--color-navy-900);
}

.bg-navy-800 {
  background-color: var(--color-navy-800);
}

.bg-navy-700 {
  background-color: var(--color-navy-700);
}

.bg-navy-600 {
  background-color: var(--color-navy-600);
}
</style> 