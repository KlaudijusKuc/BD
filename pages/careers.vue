<template>
  <div>
    <!-- Header -->
    <div class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/80 to-black"></div>
      <div class="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-20"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1)_0%,transparent_70%)]"></div>
      <div class="relative container mx-auto px-6 md:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Karjera <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Su Mumis</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
            Prisijunkite prie mūsų komandos ir kartu kurkime ateitį
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#open-positions" 
              class="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium rounded-lg hover:from-purple-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
            >
              Peržiūrėti Pozicijas
            </a>
            <a 
              href="#culture" 
              class="px-8 py-4 bg-gray-800/50 border border-gray-700 text-white font-medium rounded-lg hover:bg-gray-800/70 transition-all duration-200 transform hover:scale-105"
            >
              Sužinoti Daugiau
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Why Join Us Section -->
    <div class="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.05)_0%,transparent_70%)]"></div>
      <div class="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
      <div class="container mx-auto px-6 md:px-8 relative">
        <div class="text-center mb-16">
          <span class="inline-block px-4 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium mb-4">Mūsų Vertybės</span>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Kodėl Verta <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Prisijungti?</span></h2>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">Atraskite, kas padaro mūsų komandą ypatingą ir kodėl verta prisijungti prie mūsų</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative glass-card p-8 h-full">
              <div class="flex items-start mb-6">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-6 flex-shrink-0">
                  <HeartIcon class="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-2">Puiki Komanda</h3>
                  <p class="text-gray-300 leading-relaxed">Dirbkite su talentingais ir motyvuotais žmonėmis, kurie dalinasi jūsų aistra technologijoms.</p>
                </div>
              </div>
              <div class="flex items-start mb-6">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-6 flex-shrink-0">
                  <SparklesIcon class="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-2">Inovacijos</h3>
                  <p class="text-gray-300 leading-relaxed">Dirbkite su naujausiomis technologijomis ir metodologijomis, kurkite ateities sprendimus.</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-6 flex-shrink-0">
                  <ChartBarIcon class="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-2">Karjeros Augimas</h3>
                  <p class="text-gray-300 leading-relaxed">Mokymosi galimybės, mokymai ir aiškus karjeros augimo kelias jūsų profesiniam tobulėjimui.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative glass-card p-8 h-full">
              <div class="flex items-start mb-6">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-6 flex-shrink-0">
                  <UserGroupIcon class="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-2">Bendradarbiavimas</h3>
                  <p class="text-gray-300 leading-relaxed">Mes tikime komandos darbo galia ir skatiname atvirą bendravimą tarp visų komandos narių.</p>
                </div>
              </div>
              <div class="flex items-start mb-6">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-6 flex-shrink-0">
                  <LightBulbIcon class="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-2">Kūrybiškumas</h3>
                  <p class="text-gray-300 leading-relaxed">Skatiname kūrybiškumą ir eksperimentavimą, leisdami mūsų komandai ištobulinti naujus sprendimus.</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-6 flex-shrink-0">
                  <HeartIcon class="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-2">Pusiausvyra</h3>
                  <p class="text-gray-300 leading-relaxed">Vertiname darbą ir asmeninį gyvenimą, siūlydami lankstų darbo grafiką ir nuotolinio darbo galimybes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Open Positions -->
    <div class="py-24">
      <div class="container mx-auto px-6 md:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Atidarytos Pozicijos</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="position in positions" :key="position.id" class="glass-card p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                {{ position.type }}
              </span>
              <span class="text-gray-400 text-sm">{{ position.location }}</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-4">{{ position.title }}</h3>
            <p class="text-gray-300 mb-6">{{ position.description }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center text-gray-400">
                  <ClockIcon class="w-4 h-4 mr-1" />
                  <span class="text-sm">{{ position.hours }}</span>
                </div>
                <div class="flex items-center text-gray-400">
                  <CurrencyEuroIcon class="w-4 h-4 mr-1" />
                  <span class="text-sm">{{ position.salary }}</span>
                </div>
              </div>
              <button
                @click="openApplicationForm(position)"
                class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Kreiptis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Company Culture Section -->
    <div class="py-24 bg-gradient-to-b from-black to-gray-900">
      <div class="container mx-auto px-6 md:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Mūsų Kultūra</h2>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div class="w-full h-64 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/10 flex items-center justify-center">
              <UserGroupIcon class="w-24 h-24 text-purple-300/50" />
            </div>
          </div>
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <UserGroupIcon class="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-white mb-2">Bendradarbiavimas</h3>
                <p class="text-gray-300">Mes tikime komandos darbo galia ir skatiname atvirą bendravimą tarp visų komandos narių.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <LightBulbIcon class="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-white mb-2">Inovacijos</h3>
                <p class="text-gray-300">Skatiname kūrybiškumą ir eksperimentavimą, leisdami mūsų komandai ištobulinti naujus sprendimus.</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                <HeartIcon class="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-white mb-2">Pusiausvyra</h3>
                <p class="text-gray-300">Vertiname darbą ir asmeninį gyvenimą, siūlydami lankstų darbo grafiką ir nuotolinio darbo galimybes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Career Growth Section -->
    <div class="py-24">
      <div class="container mx-auto px-6 md:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Karjeros Augimas</h2>
        <div class="glass-card p-8 max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl font-bold text-white mb-4">Jūsų Kelias Su Mumis</h3>
              <p class="text-gray-300 mb-6">
                Mes tikime, kad kiekvienas darbuotojas turi potencialą augti ir tobulėti. Štai kaip atrodo jūsų kelias su mumis:
              </p>
              <div class="space-y-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <span class="text-purple-300 font-bold">1</span>
                  </div>
                  <div>
                    <h4 class="text-white font-medium">Pradžia</h4>
                    <p class="text-gray-400 text-sm">Prisijungimas prie komandos ir įsitraukimas į projektus</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <span class="text-purple-300 font-bold">2</span>
                  </div>
                  <div>
                    <h4 class="text-white font-medium">Tobulėjimas</h4>
                    <p class="text-gray-400 text-sm">Mokymai, mentoravimas ir naujų įgūdžių įgijimas</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <span class="text-purple-300 font-bold">3</span>
                  </div>
                  <div>
                    <h4 class="text-white font-medium">Augimas</h4>
                    <p class="text-gray-400 text-sm">Didesnė atsakomybė ir nauji projektai</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <span class="text-purple-300 font-bold">4</span>
                  </div>
                  <div>
                    <h4 class="text-white font-medium">Liderystė</h4>
                    <p class="text-gray-400 text-sm">Komandos vadovavimas ir strateginis planavimas</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-lg"></div>
              <div class="w-full h-64 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/10 flex items-center justify-center">
                <ChartBarIcon class="w-24 h-24 text-purple-300/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div class="container mx-auto px-6 md:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Dažniausiai Užduodami Klausimai</h2>
        <div class="max-w-3xl mx-auto space-y-6">
          <div v-for="(faq, index) in faqs" :key="index" class="glass-card p-6">
            <button 
              @click="toggleFaq(index)" 
              class="flex justify-between items-center w-full text-left"
            >
              <h3 class="text-lg font-medium text-white">{{ faq.question }}</h3>
              <ChevronDownIcon 
                class="w-5 h-5 text-gray-400 transition-transform" 
                :class="{ 'transform rotate-180': faq.isOpen }"
              />
            </button>
            <div v-if="faq.isOpen" class="mt-4 text-gray-300">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Form Modal -->
    <div v-if="showApplicationForm" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="glass-card p-8 max-w-2xl w-full mx-4 border border-purple-500/30 shadow-lg shadow-purple-500/10">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-white">Kreiptis į poziciją: {{ selectedPosition?.title }}</h3>
          <button
            @click="closeApplicationForm"
            class="text-gray-400 hover:text-white"
          >
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        <form @submit.prevent="submitApplication" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Vardas</label>
              <input
                v-model="application.name"
                type="text"
                required
                class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">El. paštas</label>
              <input
                v-model="application.email"
                type="email"
                required
                class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Telefono numeris</label>
            <input
              v-model="application.phone"
              type="tel"
              required
              class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">CV</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              required
              class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Motyvacinis laiškas</label>
            <textarea
              v-model="application.coverLetter"
              rows="4"
              required
              class="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              @click="closeApplicationForm"
              class="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              Atšaukti
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Pateikti
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  ClockIcon, 
  CurrencyEuroIcon, 
  XMarkIcon, 
  HeartIcon, 
  SparklesIcon, 
  ChartBarIcon,
  UserGroupIcon,
  LightBulbIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'

const positions = ref([
  {
    id: 1,
    title: 'Frontend Developer',
    type: 'Pilnas etatas',
    location: 'Vilnius',
    hours: '40h/sav',
    salary: '2500-3500€',
    description: 'Ieškome patyrusio Frontend programuotojo, kuris prisijungs prie mūsų komandos ir padės kurti modernias web aplikacijas.'
  },
  {
    id: 2,
    title: 'Backend Developer',
    type: 'Pilnas etatas',
    location: 'Vilnius',
    hours: '40h/sav',
    salary: '2500-3500€',
    description: 'Ieškome patyrusio Backend programuotojo, kuris prisijungs prie mūsų komandos ir padės kurti saugias ir efektingas serverio aplikacijas.'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    type: 'Pilnas etatas',
    location: 'Vilnius',
    hours: '40h/sav',
    salary: '2000-3000€',
    description: 'Ieškome kūrybiško UI/UX dizainerio, kuris padės kurti patrauklias ir naudojamas vartotojo sąsajas.'
  }
])

const testimonials = ref([
  {
    id: 1,
    name: 'Laura Kazlauskaitė',
    position: 'Frontend Developer',
    quote: 'Dirbti čia yra puiki patirtis. Komanda yra labai atviros minties ir visada pasiruošusi padėti. Mano įgūdžiai auga kasdien.'
  },
  {
    id: 2,
    name: 'Marius Jankauskas',
    position: 'Backend Developer',
    quote: 'Mūsų kompanija suteikia puikią pusiausvyrą tarp darbo ir asmeninio gyvenimo. Taip pat vertinu galimybę dirbti su naujausiomis technologijomis.'
  },
  {
    id: 3,
    name: 'Eglė Petrauskienė',
    position: 'UI/UX Designer',
    quote: 'Čia gavau galimybę tobulėti savo karjeroje ir dirbti su įdomiais projektais. Komanda yra labai kūrybiška ir motyvuota.'
  }
])

const faqs = ref([
  {
    question: 'Kokie yra darbo laiko grafikai?',
    answer: 'Mes siūlome lankstų darbo grafiką, kuris pritaikytas jūsų poreikiams. Dauguma mūsų darbuotojų dirba 40 valandų per savaitę, tačiau siūlome ir dalinio etato galimybes.',
    isOpen: false
  },
  {
    question: 'Ar siūlote nuotolinio darbo galimybes?',
    answer: 'Taip, mes siūlome hibridinį darbo modelį, kur darbuotojai gali dirbti tiek iš biuro, tiek nuotoliniu būdu. Tai leidžia mums rinktis geriausius talentus nepriklausomai nuo jų vietos.',
    isOpen: false
  },
  {
    question: 'Kokios yra karjeros augimo galimybės?',
    answer: 'Mes tikime nuolatinio tobulėjimo principu ir suteikiame mokymų, mentoravimo ir aiškų karjeros augimo kelią. Kiekvienas darbuotojas turi galimybę augti į senior pozicijas ir vadovavimo roles.',
    isOpen: false
  },
  {
    question: 'Kokie yra atlygio paketai?',
    answer: 'Mes siūlome konkurencingą atlygį, papildomus privalumus (sveikatos draudimą, papildomą atostogų laiką, mokymų biudžetą) ir galimybę dalintis įmonės sėkme per akcijų programą.',
    isOpen: false
  }
])

const showApplicationForm = ref(false)
const selectedPosition = ref(null)
const application = ref({
  name: '',
  email: '',
  phone: '',
  coverLetter: ''
})

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

const openApplicationForm = (position) => {
  selectedPosition.value = position
  showApplicationForm.value = true
}

const closeApplicationForm = () => {
  showApplicationForm.value = false
  selectedPosition.value = null
  application.value = {
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  }
}

const submitApplication = () => {
  // Create a new job application object
  const newApplication = {
    id: Date.now(), // Use timestamp as a unique ID
    position: selectedPosition.value,
    name: application.value.name,
    email: application.value.email,
    phone: application.value.phone,
    coverLetter: application.value.coverLetter,
    date: new Date().toISOString(),
    status: 'new'
  }
  
  // Get existing applications from localStorage
  const existingApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]')
  
  // Add the new application
  existingApplications.push(newApplication)
  
  // Save back to localStorage
  localStorage.setItem('jobApplications', JSON.stringify(existingApplications))
  
  // Show success message
  alert('Jūsų paraiška sėkmingai pateikta!')
  
  // Close the form
  closeApplicationForm()
}
</script>

<style scoped>
.glass-card {
  @apply bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg;
}
</style> 