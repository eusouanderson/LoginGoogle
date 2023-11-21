// router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ChannelsPage from '../views/ChannelsPage.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/channels',
    component: ChannelsPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
