<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 bg-gradient-to-br from-navy-900/90 to-navy-800/90"></div>
      <div class="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <!-- Content -->
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-7xl font-display font-bold mb-6 text-white">
            Transformuojame Idėjas į
            <span class="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">Skaitmeninę Realybę</span>
          </h1>
          <p class="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Padėsiame verslams klestėti skaitmeninėje eroje su moderniais technologiniais sprendimais ir inovatyviomis strategijomis.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/contact"
              class="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 text-white font-medium hover:from-purple-400 hover:via-pink-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-navy-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
            >
              Pradėti
            </NuxtLink>
            <NuxtLink
              to="/services"
              class="px-8 py-4 rounded-lg border border-purple-500/30 text-white font-medium hover:bg-purple-500/10 transition-all duration-200 transform hover:scale-105"
            >
              Mūsų Paslaugos
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDownIcon class="w-6 h-6 text-purple-400" />
      </div>
    </section>
    
    <!-- Services Section -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-display font-bold mb-4 text-white">Mūsų Paslaugos</h2>
          <p class="text-xl text-gray-200 max-w-2xl mx-auto">
            Visapusiški sprendimai, pritaikyti jūsų verslo poreikiams
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.id" class="bg-navy-800/50 backdrop-blur-sm rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 group border border-purple-500/10 hover:border-purple-500/30">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/40 group-hover:to-blue-500/30 transition-all duration-300">
              <component :is="service.icon" class="w-6 h-6 text-purple-300" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">{{ service.title }}</h3>
            <p class="text-gray-300">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/50 to-navy-900"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="text-4xl font-display font-bold text-white">Why Choose Us</h2>
            <p class="text-xl text-gray-200">
              We combine innovation with expertise to deliver exceptional results
            </p>
            <div class="space-y-4">
              <div v-for="feature in features" :key="feature.id" class="flex items-start">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center">
                  <CheckIcon class="w-4 h-4 text-purple-300" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-white">{{ feature.title }}</h3>
                  <p class="text-gray-300 mt-1">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="bg-navy-800/50 backdrop-blur-sm rounded-xl p-8 animate-float border border-purple-500/10">
              <img src="/images/features.svg" alt="Features" class="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <Testimonials />
    
    <!-- Blog Preview Section -->
    <BlogPreview />
    
    <!-- CTA Section -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-gradient-to-br from-navy-900/90 to-navy-800/90"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="bg-navy-800/50 backdrop-blur-sm rounded-xl p-12 text-center max-w-4xl mx-auto border border-purple-500/10">
          <h2 class="text-4xl font-display font-bold mb-6 text-white">Pasiruošę Pradėti?</h2>
          <p class="text-xl text-gray-200 mb-8">
            Aptarkime, kaip galime padėti transformuoti jūsų verslą su mūsų inovatyviais sprendimais.
          </p>
          <NuxtLink
            to="/contact"
            class="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 text-white font-medium hover:from-purple-400 hover:via-pink-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-navy-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
          >
            Susisiekite Dabar
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  ChevronDownIcon,
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
    icon: CodeBracketIcon
  },
  {
    id: 2,
    title: 'Mobilūs Programėlės',
    description: 'Natūralios ir kryžminės platformos mobilios programėlės iOS ir Android sistemoms.',
    icon: DevicePhoneMobileIcon
  },
  {
    id: 3,
    title: 'Skaitmeninis Marketingas',
    description: 'Strateginiai marketingo sprendimai jūsų internetinės buvimo vietos augimui.',
    icon: ChartBarIcon
  },
  {
    id: 4,
    title: 'Kibernetinis Saugumas',
    description: 'Visapusiški saugumo sprendimai jūsų skaitmeniniam turtui apsaugoti.',
    icon: ShieldCheckIcon
  },
  {
    id: 5,
    title: 'Debesies Sprendimai',
    description: 'Masteliuojama debesies infrastruktūra ir diegimo paslaugos.',
    icon: RocketLaunchIcon
  },
  {
    id: 6,
    title: 'Konsultacijos',
    description: 'Ekspertinis vadovavimas jūsų skaitmeninės transformacijos kelionei.',
    icon: UserGroupIcon
  }
]

const features = [
  {
    id: 1,
    title: 'Ekspertų Komanda',
    description: 'Mūsų komandą sudaro patyrę profesionalai su įvairiapatirčiu.'
  },
  {
    id: 2,
    title: 'Individualūs Sprendimai',
    description: 'Pritaikyti sprendimai, sukurti atitikti jūsų specifinius verslo poreikius.'
  },
  {
    id: 3,
    title: 'Kokybės Užtikrinimas',
    description: 'Stiprūs testavimo ir kokybės kontrolės procesai patikimiems rezultatams.'
  },
  {
    id: 4,
    title: '24/7 Palaikymas',
    description: 'Visą parą techninė pagalba ir priežiūros paslaugos.'
  }
]
</script>

<style>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style> 