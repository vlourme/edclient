import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import store from '../store/index'

// Enable router
Vue.use(VueRouter)

// Routes
const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: () => import('../views/Authentication.vue')
  }
]

// Router settings
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

console.log("[Router] isLogged:", store.getters.isLogged)

// Routing guard
router.beforeEach((to, from, next) => {
  // Checking if already logged
  if (to.name === 'Authentication' && store.getters.isLogged) {
    console.log('[Router] Already logged, forcing Dashboard.');
    next({ name: 'Dashboard' });
  }

  // Redirect to authentication page if not logged
  if (to.name !== 'Authentication' && !store.getters.isLogged) {
    next({ name: 'Authentication' });
  }
    
  // Allow continue
  next();
})

export default router
