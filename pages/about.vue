<template>
  <div class="min-h-screen">
    <!-- Header -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-navy-900/90 to-navy-800/90"></div>
      <div class="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-6 text-white">Apie mus</h1>
          <p class="text-xl text-gray-200">
            Mes esame technologijų entuziastų komanda, įsipareigojusi transformuoti verslus per inovatyvius sprendimus.
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="text-3xl font-display font-bold text-white">Mūsų Misija</h2>
            <p class="text-xl text-gray-200">
              Įgalinti verslus su moderniais technologiniais sprendimais, kurie skatina augimą, inovacijas ir sėkmę skaitmeninėje eroje.
            </p>
            <p class="text-gray-300">
              Mes tikime, kad kuriame tvarius, masteliuojamus sprendimus, kurie ne tik atitinka dabartinius poreikius, bet ir numato būsimus iššūkius. Mūsų požiūris derina techninę ekspertizę su giliu verslo tikslų supratimu.
            </p>
          </div>
          <div class="relative">
            <div class="bg-navy-800/50 backdrop-blur-sm rounded-xl p-8 animate-float border border-purple-500/10">
              <img src="/images/mission.svg" alt="Our Mission" class="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-display font-bold text-white mb-4">Mūsų Vadovaujanti Komanda</h2>
          <p class="text-xl text-gray-200 max-w-2xl mx-auto">
            Susipažinkite su ekspertais už mūsų sėkmę
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="member in team" :key="member.id" class="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 mx-auto mb-4 flex items-center justify-center">
              <component :is="member.icon" class="w-12 h-12 text-purple-300" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">{{ member.name }}</h3>
            <p class="text-purple-300 mb-4">{{ member.position }}</p>
            <p class="text-gray-300">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-br from-navy-900/90 to-navy-800/90"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-display font-bold text-white mb-4">Mūsų Pagrindinės Vertybės</h2>
          <p class="text-xl text-gray-200 max-w-2xl mx-auto">
            Principai, kurie vadovauja viskam, ką darome
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="value in values" :key="value.id" class="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
            <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 mx-auto mb-4 flex items-center justify-center">
              <component :is="value.icon" class="w-8 h-8 text-purple-300" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">{{ value.title }}</h3>
            <p class="text-gray-300">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="bg-navy-800/50 backdrop-blur-sm rounded-xl p-12 text-center max-w-4xl mx-auto border border-purple-500/10">
          <h2 class="text-4xl font-display font-bold mb-6 text-white">Prisijunkite prie Mūsų Kelionės</h2>
          <p class="text-xl text-gray-200 mb-8">
            Būkite komandos dalimi, kuri formuoja technologijų ateitį.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/careers"
              class="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 text-white font-medium hover:from-purple-400 hover:via-pink-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-navy-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
            >
              Peržiūrėti Karjerą
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="inline-block px-8 py-4 rounded-lg border border-purple-500/30 text-white font-medium hover:bg-purple-500/10 transition-all duration-200 transform hover:scale-105"
            >
              Susisiekite
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  UserGroupIcon,
  LightBulbIcon,
  ChartBarIcon,
  SparklesIcon
} from '@heroicons/vue/24/outline'

const team = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO & Įkūrėja',
    bio: 'Vizionierė lyderė su daugiau nei 15 metų patirtimi technologijose ir verslo inovacijose.',
    icon: UserIcon
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'CTO',
    bio: 'Techninis ekspertas, specializuojantis dirbtiniame intelekte, debesies architektūroje ir masteliuojamose sistemose.',
    icon: SparklesIcon
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Dizaino Vadovė',
    bio: 'Kūrybinė direktorė su aistra vartotojų centrinei dizainui ir skaitmeninėms patirtims.',
    icon: RocketLaunchIcon
  }
]

const values = [
  {
    id: 1,
    title: 'Inovacijos',
    description: 'Mes nuolat siekiame ribų, kad sukurtume modernius sprendimus.',
    icon: LightBulbIcon
  },
  {
    id: 2,
    title: 'Integrumas',
    description: 'Mes veikiame skaidriai ir etiškai.',
    icon: ShieldCheckIcon
  },
  {
    id: 3,
    title: 'Bendradarbiavimas',
    description: 'Mes tikime komandos darbo ir partnerystės galia.',
    icon: UserGroupIcon
  },
  {
    id: 4,
    title: 'Puoselėjimas',
    description: 'Mes siekiame aukščiausios kokybės visame, ką darome.',
    icon: ChartBarIcon
  }
]
</script> 