import { createRouter, createWebHistory } from 'vue-router'
import LogPage from '../views/LogPage.vue'


const routes = [
    {
        path: '/',
        name: 'login',
        component: LogPage
    }
];







const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router