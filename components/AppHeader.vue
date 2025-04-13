<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <!-- Blurred gradient background -->
    <div class="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-md"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <span class="text-2xl font-display font-bold text-white">e-shop99</span>
        </NuxtLink>
        
        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navigationItems" 
            :key="item.path" 
            :to="item.path"
            class="text-gray-200 hover:text-white transition-colors duration-200"
            active-class="text-purple-300 font-medium"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
        
        <!-- CTA Button -->
        <div class="hidden md:block">
          <NuxtLink 
            to="/contact" 
            class="btn-primary"
          >
            Susisiekite
          </NuxtLink>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden text-gray-200 hover:text-white focus:outline-none"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Bars3Icon v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div 
      v-if="isMobileMenuOpen" 
      class="md:hidden absolute inset-x-0 top-20 bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md py-4"
    >
      <div class="container mx-auto px-4">
        <nav class="flex flex-col space-y-4">
          <NuxtLink 
            v-for="item in navigationItems" 
            :key="item.path" 
            :to="item.path"
            class="text-gray-200 hover:text-white transition-colors duration-200 py-2"
            active-class="text-purple-300 font-medium"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="btn-primary w-full text-center"
            @click="isMobileMenuOpen = false"
          >
            Susisiekite
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const isMobileMenuOpen = ref(false)

const navigationItems = [
  { name: 'Pradžia', path: '/' },
  { name: 'Apie mus', path: '/about' },
  { name: 'Paslaugos', path: '/services' },
  { name: 'Blogas', path: '/blog' },
  { name: 'Karjera', path: '/careers' },
  { name: 'Kontaktai', path: '/contact' }
]
</script>

<style scoped>
.btn-primary {
  @apply inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium hover:from-purple-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30;
}
</style> 