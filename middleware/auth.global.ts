export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware on server-side
  if (process.server) return
  
  // Check if the route is in the admin section
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
    
    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      return navigateTo('/admin/login')
    }
  }
  
  // If user is authenticated and trying to access login page, redirect to admin dashboard
  if (to.path === '/admin/login') {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
    if (isAuthenticated) {
      return navigateTo('/admin')
    }
  }
}) 