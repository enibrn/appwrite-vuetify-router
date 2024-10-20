import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import { useAuthStore } from '@/stores/useAuthStore';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth: boolean = to.matched
    .some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;