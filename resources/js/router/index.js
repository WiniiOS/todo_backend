// resources/js/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import TaskList from '../components/TaskList.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/tasks', name: 'TaskList', component: TaskList, meta: { requiresAuth: true } },
  { path: '/', redirect: '/tasks' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protéger les routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
