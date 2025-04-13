import type { NavigationGuard } from 'vue-router'

interface AuthContext {
  route: {
    path: string
  }
  redirect: (path: string) => void
}

export default function({ route, redirect }: AuthContext): void | NavigationGuard {
  // Check if the route is in the admin section
  if (route.path.startsWith('/admin') && route.path !== '/admin/login') {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
    
    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      return redirect('/admin/login')
    }
  }
  
  // If user is authenticated and trying to access login page, redirect to admin dashboard
  if (route.path === '/admin/login') {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
    if (isAuthenticated) {
      return redirect('/admin')
    }
  }
} 