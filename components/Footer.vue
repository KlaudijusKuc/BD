<template>
  <footer class="bg-black border-t border-gray-800/50">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <NuxtLink to="/" class="flex items-center space-x-2 group">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span class="text-xl font-bold text-white">e99</span>
            </div>
            <span class="text-xl font-display font-bold text-white group-hover:text-purple-300 transition-colors duration-300">e-shop99</span>
          </NuxtLink>
          <p class="text-gray-400">
            Inovatyvūs technologijų sprendimai jūsų verslui
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
              <span class="sr-only">Facebook</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
              <span class="sr-only">Twitter</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
              <span class="sr-only">LinkedIn</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">Greitos nuorodos</h3>
          <ul class="space-y-2">
            <li v-for="item in quickLinks" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-white font-semibold mb-4">Paslaugos</h3>
          <ul class="space-y-2">
            <li v-for="service in services" :key="service.name">
              <NuxtLink
                :to="service.href"
                class="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {{ service.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-semibold mb-4">Kontaktai</h3>
          <ul class="space-y-2">
            <li class="flex items-start space-x-3">
              <MapPinIcon class="w-5 h-5 text-purple-400 mt-1" />
              <span class="text-gray-400">123 Tech Street, Innovation Hub<br>Silicon Valley, CA 94025</span>
            </li>
            <li class="flex items-center space-x-3">
              <PhoneIcon class="w-5 h-5 text-purple-400" />
              <span class="text-gray-400">+1 (555) 123-4567</span>
            </li>
            <li class="flex items-center space-x-3">
              <EnvelopeIcon class="w-5 h-5 text-purple-400" />
              <span class="text-gray-400">info@e-shop99.com</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-gray-800/50">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} e-shop99. Visos teisės saugomos.
          </p>
          <div class="flex space-x-6">
            <NuxtLink
              v-for="item in legalLinks"
              :key="item.name"
              :to="item.href"
              class="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/vue/24/outline'

const quickLinks = [
  { name: 'Pradžia', href: '/' },
  { name: 'Apie mus', href: '/about' },
  { name: 'Paslaugos', href: '/services' },
  { name: 'Karjera', href: '/careers' },
  { name: 'Kontaktai', href: '/contact' }
]

const services = [
  { name: 'Web Development', href: '/services#web-development' },
  { name: 'Mobile Apps', href: '/services#mobile-apps' },
  { name: 'Digital Marketing', href: '/services#digital-marketing' },
  { name: 'Cybersecurity', href: '/services#cybersecurity' },
  { name: 'Cloud Solutions', href: '/services#cloud-solutions' }
]

const legalLinks = [
  { name: 'Privatumo politika', href: '/privacy' },
  { name: 'Naudojimo sąlygos', href: '/terms' },
  { name: 'Slapukų politika', href: '/cookies' }
]
</script> 