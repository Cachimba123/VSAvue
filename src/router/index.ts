import isAutheticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import NotFound from '@/modules/common/pages/notFound.vue';
import HomePage from '@/modules/landing/pages/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  
  {
    path: '/',
    name: 'landing',
    component: () => import('@/modules/landing/layout/landingLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: HomePage,
      },
      {
        path: '/features',
        name: 'features',
        component: () => import('@/modules/landing/pages/FeaturesPage.vue'),
      },
      {
        path: '/pricing',
        name: 'pricing',
        component: () => import('@/modules/landing/pages/PricingPage.vue'),
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('@/modules/landing/pages/ContactPage.vue'),
      },
      {
        path: '/pokemons/:id',
        name: 'pokemons',
        beforeEnter: [isAutheticatedGuard],
        // props: true,
        props: (route: { params: { id: string } }) => {
          console.log(route);

          const id = Number(route.params.id);
          return isNaN(id) ? { id: 1 } : { id };
        },
        component: () => import('@/modules/pokemons/pages/pokemonPage.vue'),
      },
    ],
  },

  //Auth
  {
    path: '/auth',
    redirect: '/login',
    component: () => import('@/modules/auth/layout/authLayout.vue'),
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import('@/modules/auth/pages/registerPage.vue'),
      },
      {
        // path: '',
        path: '/login',
        name: 'login',
        component: () => import('@/modules/auth/pages/loginPage.vue'),
      },
    ],
  },

  //Not found
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
