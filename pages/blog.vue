<template>
  <div>
    <!-- Header -->
    <header class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-md"></div>
      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Mūsų Blogas
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl">
          Naujausios naujienos, patarimai ir įžvalgos apie technologijas, verslą ir inovacijas.
        </p>
      </div>
    </header>

    <!-- Blog Posts -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- Featured Post -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-8 text-white">Featured Post</h2>
          <div class="glass-card p-6">
            <div class="grid md:grid-cols-2 gap-8">
              <div class="relative h-64 md:h-auto">
                <img
                  src="/images/blog/featured-post.svg"
                  alt="Featured Post"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <div class="flex items-center gap-4 mb-4">
                  <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Technology</span>
                  <span class="text-gray-400 text-sm">March 15, 2024</span>
                </div>
                <h3 class="text-2xl font-bold mb-4 text-white">The Future of E-commerce: AI and Machine Learning</h3>
                <p class="text-gray-300 mb-6">
                  Explore how artificial intelligence and machine learning are transforming the e-commerce landscape,
                  from personalized shopping experiences to automated inventory management.
                </p>
                <NuxtLink
                  to="/blog/future-of-ecommerce"
                  class="inline-flex items-center text-purple-400 hover:text-purple-300"
                >
                  Read More
                  <ArrowRightIcon class="w-4 h-4 ml-2" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Posts -->
        <div>
          <h2 class="text-3xl font-bold mb-8 text-white">Recent Posts</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Post 1 -->
            <article class="glass-card p-6">
              <div class="relative h-48 mb-6">
                <img
                  src="/images/blog/post-1.svg"
                  alt="Blog Post 1"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div class="flex items-center gap-4 mb-4">
                <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Development</span>
                <span class="text-gray-400 text-sm">March 10, 2024</span>
              </div>
              <h3 class="text-xl font-bold mb-4 text-white">Building Scalable Web Applications</h3>
              <p class="text-gray-300 mb-6">
                Learn about the best practices and technologies for building scalable web applications
                that can handle millions of users.
              </p>
              <NuxtLink
                to="/blog/scalable-web-applications"
                class="inline-flex items-center text-purple-400 hover:text-purple-300"
              >
                Read More
                <ArrowRightIcon class="w-4 h-4 ml-2" />
              </NuxtLink>
            </article>

            <!-- Post 2 -->
            <article class="glass-card p-6">
              <div class="relative h-48 mb-6">
                <img
                  src="/images/blog/post-2.svg"
                  alt="Blog Post 2"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div class="flex items-center gap-4 mb-4">
                <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Design</span>
                <span class="text-gray-400 text-sm">March 5, 2024</span>
              </div>
              <h3 class="text-xl font-bold mb-4 text-white">UI/UX Design Trends for 2024</h3>
              <p class="text-gray-300 mb-6">
                Discover the latest UI/UX design trends that are shaping the digital landscape
                and improving user experiences.
              </p>
              <NuxtLink
                to="/blog/ui-ux-trends-2024"
                class="inline-flex items-center text-purple-400 hover:text-purple-300"
              >
                Read More
                <ArrowRightIcon class="w-4 h-4 ml-2" />
              </NuxtLink>
            </article>

            <!-- Post 3 -->
            <article class="glass-card p-6">
              <div class="relative h-48 mb-6">
                <img
                  src="/images/blog/post-3.svg"
                  alt="Blog Post 3"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div class="flex items-center gap-4 mb-4">
                <span class="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">Marketing</span>
                <span class="text-gray-400 text-sm">March 1, 2024</span>
              </div>
              <h3 class="text-xl font-bold mb-4 text-white">Digital Marketing Strategies</h3>
              <p class="text-gray-300 mb-6">
                Explore effective digital marketing strategies that can help businesses
                reach their target audience and achieve their goals.
              </p>
              <NuxtLink
                to="/blog/digital-marketing-strategies"
                class="inline-flex items-center text-purple-400 hover:text-purple-300"
              >
                Read More
                <ArrowRightIcon class="w-4 h-4 ml-2" />
              </NuxtLink>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const blogPosts = [
  {
    id: 1,
    title: 'E-parduotuvės tendencijos 2024 metais',
    excerpt: 'Aptariame naujausias e-parduotuvės tendencijas ir kaip jos paveiks jūsų verslą.',
    category: 'E-parduotuvės',
    image: '/images/blog/post-1.jpg',
    author: {
      name: 'Marius Jankauskas',
      avatar: '/images/testimonials/avatar-2.svg'
    },
    date: '2024-03-10'
  },
  {
    id: 2,
    title: 'Kaip optimizuoti mobiliąją versiją',
    excerpt: 'Patarimai, kaip pagerinti mobiliosios versijos naudojimo patirtį ir konversiją.',
    category: 'Web Dizainas',
    image: '/images/blog/post-2.jpg',
    author: {
      name: 'Eglė Petrauskienė',
      avatar: '/images/testimonials/avatar-3.svg'
    },
    date: '2024-03-05'
  },
  {
    id: 3,
    title: 'Debesies sprendimų privalumai',
    excerpt: 'Kodėl debesies sprendimai tampa būtini moderniam verslui?',
    category: 'Technologijos',
    image: '/images/blog/post-3.jpg',
    author: {
      name: 'Laura Kazlauskaitė',
      avatar: '/images/testimonials/avatar-1.svg'
    },
    date: '2024-02-28'
  }
]
</script> 