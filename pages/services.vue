<template>
  <div class="min-h-screen bg-black">
    <!-- Header -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/10"></div>
      <div class="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-6 text-white">Mūsų Paslaugos</h1>
          <p class="text-xl text-gray-200">
            Visapusiški technologijų sprendimai, padėsiantys jūsų verslui augti ir sėkmingai veikti skaitmeninėje eroje.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.id" class="glass-card rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300 group">
            <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mb-6 group-hover:from-purple-500/40 group-hover:to-blue-500/30 transition-all duration-300">
              <component :is="service.icon" class="w-7 h-7 text-purple-300" />
            </div>
            <h3 class="text-2xl font-semibold text-white mb-4">{{ service.title }}</h3>
            <p class="text-gray-300 mb-6">{{ service.description }}</p>
            <ul class="space-y-3">
              <li v-for="feature in service.features" :key="feature" class="flex items-start">
                <div class="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mt-1">
                  <CheckIcon class="w-3 h-3 text-purple-300" />
                </div>
                <span class="ml-3 text-gray-300">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/10"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="glass-card rounded-xl p-12 text-center max-w-4xl mx-auto">
          <h2 class="text-4xl font-display font-bold mb-6 text-white">Pasiruošę Pradėti?</h2>
          <p class="text-xl text-gray-200 mb-8">
            Aptarkime, kaip galime padėti transformuoti jūsų verslą su mūsų inovatyviais sprendimais.
          </p>
          <NuxtLink
            to="/contact"
            class="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium hover:from-purple-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-950 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
          >
            Susisiekite Dabar
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  CheckIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Individualūs web aplikacijų sprendimai, sukurti naudojant modernias technologijas ir geriausias praktikas.',
    icon: CodeBracketIcon,
    features: [
      'Responsyvus Dizainas',
      'Veikimo Optimizavimas',
      'SEO Geriausios Praktikos',
      'Turinio Valdymo Sistemos'
    ]
  },
  {
    id: 2,
    title: 'Mobilūs Programėlės',
    description: 'Natūralios ir kryžminės platformos mobilios programėlės iOS ir Android sistemoms.',
    icon: DevicePhoneMobileIcon,
    features: [
      'iOS Kūrimas',
      'Android Kūrimas',
      'Kryžminės Platformos Sprendimai',
      'Programėlių Parduotuvės Optimizavimas'
    ]
  },
  {
    id: 3,
    title: 'Skaitmeninis Marketingas',
    description: 'Strateginiai marketingo sprendimai jūsų internetinės buvimo vietos augimui.',
    icon: ChartBarIcon,
    features: [
      'SEO Paslaugos',
      'Socialinių Tinklų Marketingas',
      'Turinio Strategija',
      'Analitika ir Ataskaitos'
    ]
  },
  {
    id: 4,
    title: 'Kibernetinis Saugumas',
    description: 'Visapusiški saugumo sprendimai jūsų skaitmeniniam turtui apsaugoti.',
    icon: ShieldCheckIcon,
    features: [
      'Saugumo Auditas',
      'Gresmės Aptikimas',
      'Duomenų Apsauga',
      'Atitikties Valdymas'
    ]
  },
  {
    id: 5,
    title: 'Debesies Sprendimai',
    description: 'Masteliuojama debesies infrastruktūra ir diegimo paslaugos.',
    icon: RocketLaunchIcon,
    features: [
      'Debesies Migracija',
      'Infrastruktūros Sąranka',
      'DevOps Paslaugos',
      '24/7 Stebėjimas'
    ]
  },
  {
    id: 6,
    title: 'Konsultacijos',
    description: 'Ekspertinis vadovavimas jūsų skaitmeninės transformacijos kelionei.',
    icon: UserGroupIcon,
    features: [
      'Technologijų Įvertinimas',
      'Strateginis Planavimas',
      'Procesų Optimizavimas',
      'Komandos Mokymai'
    ]
  }
]
</script> 