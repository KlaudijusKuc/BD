<template>
  <header class="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800/50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span class="text-xl font-bold text-white">e99</span>
          </div>
          <span class="text-xl font-display font-bold text-white group-hover:text-purple-300 transition-colors duration-300">e-shop99</span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-300 hover:text-white transition-colors duration-300 relative group"
          >
            {{ item.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-600 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
        </nav>

        <!-- CTA Button -->
        <div class="hidden md:block">
          <NuxtLink
            to="/contact"
            class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium hover:from-purple-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
          >
            Susisiekite
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="isOpen = !isOpen"
          class="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-300"
        >
          <Bars3Icon v-if="!isOpen" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-show="isOpen"
        class="md:hidden py-4 border-t border-gray-800/50"
      >
        <div class="flex flex-col space-y-4">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-300 hover:text-white transition-colors duration-300"
            @click="isOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium text-center hover:from-purple-400 hover:to-blue-500 transition-all duration-200"
            @click="isOpen = false"
          >
            Susisiekite
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)

const navigation = [
  { name: 'Pradžia', href: '/' },
  { name: 'Apie mus', href: '/about' },
  { name: 'Paslaugos', href: '/services' },
  { name: 'Karjera', href: '/careers' },
  { name: 'Kontaktai', href: '/contact' }
]
</script> 