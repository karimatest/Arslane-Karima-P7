import { createRouter, createWebHistory } from 'vue-router'
import LogPage from '../views/LogPage.vue'
import HomePage from '../views/HomePage.vue'
import ProfilePage from '../views/ProfilePage.vue'
const routes = [
    {
        path: '/',
        name: 'login',
        component: LogPage
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router