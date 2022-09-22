import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { auth } from '../main';

const guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  try {
    if(auth.currentUser?.uid) {
      next();
    } else {
      next("/");
    }
  } catch (error) {
    next("/");
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/HacerAutenticacion.vue')
  },
  {
    path: '/tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: '/tabs/tab1',
        component: () => import('@/views/Tab1Page.vue'),
        beforeEnter: guard
      },
      {
        path: '/tabs/anadirRutaNueva',
        component: () => import('@/views/AnadirRuta.vue'),
        beforeEnter: guard
      },
      {
        path: '/tabs/tab2',
        component: () => import('@/views/Tab2Page.vue'),
        beforeEnter: guard
      },
      {
        path: '/tabs/tab3',
        component: () => import('@/views/Tab3Page.vue'),
        beforeEnter: guard
      },
      {
        path: '/tabs/manejoUsuarios',
        component: () => import('@/views/ManejoUsuarios.vue'),
        beforeEnter: guard
      },
      {
        path: '/tabs/tabMensajes',
        component: () => import('@/views/TabMensajes.vue'),
        beforeEnter: guard
      },
      {
        path: '/tabs/tabMensaje/:email',
        component: () => import('@/views/TabMensaje.vue'),
        beforeEnter: guard
      },
      {
        path: '/tabs/tabUserRuta/:email',
        component: () => import('@/views/TabUserRuta.vue'),
        beforeEnter: guard
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
