<template>
  <div class="min-h-screen bg-gray-900">
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-64 fixed h-full bg-gray-800/50 backdrop-blur-md border-r border-gray-700">
        <div class="p-6">
          <h1 class="text-2xl font-bold text-white mb-8">Administravimo Skydelis</h1>
          <nav class="space-y-2">
            <NuxtLink
              to="/admin"
              class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
              active-class="bg-purple-500/20 text-purple-400"
            >
              <HomeIcon class="w-5 h-5 mr-3" />
              Pagrindinis
            </NuxtLink>
            <NuxtLink
              to="/admin/submissions"
              class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
              active-class="bg-purple-500/20 text-purple-400"
            >
              <InboxIcon class="w-5 h-5 mr-3" />
              Kontaktai
            </NuxtLink>
            <NuxtLink
              to="/admin/jobs"
              class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
              active-class="bg-purple-500/20 text-purple-400"
            >
              <BriefcaseIcon class="w-5 h-5 mr-3" />
              Darbo Prašymai
            </NuxtLink>
            <NuxtLink
              to="/admin/settings"
              class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
              active-class="bg-purple-500/20 text-purple-400"
            >
              <Cog6ToothIcon class="w-5 h-5 mr-3" />
              Nustatymai
            </NuxtLink>
          </nav>
        </div>
        <div class="absolute bottom-0 left-0 right-0 p-6 space-y-2">
          <NuxtLink
            to="/"
            class="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <ArrowLeftIcon class="w-5 h-5 mr-3" />
            Grįžti į svetainę
          </NuxtLink>
          <button
            @click="handleLogout"
            class="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon class="w-5 h-5 mr-3" />
            Atsijungti
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="ml-64 flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  InboxIcon,
  Cog6ToothIcon,
  ArrowLeftIcon,
  BriefcaseIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const handleLogout = () => {
  // Clear authentication state
  localStorage.removeItem('adminAuthenticated')
  // Redirect to login page
  navigateTo('/admin/login')
}
</script> 