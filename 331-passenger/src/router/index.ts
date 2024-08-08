import { createRouter, createWebHistory } from 'vue-router';
import PassengerListView from '@/views/PassengerListView.vue';
import AboutView from '@/views/AboutView.vue';
import PassengerDetailView from '@/views/Passenger/DetailView.vue';
import PassengerRegisterView from '@/views/Passenger/RegisterView.vue';
import PassengerEditView from '@/views/Passenger/EditView.vue';
import PassengerLayoutView from '@/views/Passenger/LayoutView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NetworkErrorView from '@/views/NetworkErrorView.vue';
import nProgress from 'nprogress';
import PassengerService from '@/services/PassengerService';
import { usePassengerStore } from '@/stores/passenger';
import AirlineDetailView from '@/views/AirlineDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passenger-list-view',
      component: PassengerListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') })
    },
    {
      path: '/passenger/:id',
      name: 'passenger-layout-view',
      component: PassengerLayoutView,
      props: true,
      beforeEnter: async (to, from, next) => {
        const id = parseInt(to.params.id as string);
        const passengerStore = usePassengerStore();
        try {
          const response = await PassengerService.getPassenger(id);
          passengerStore.setPassenger(response.data);
          next();
        } catch (error) {
          if (error.response && error.response.status === 404) {
            next({
              name: '404-resource-view',
              params: { resource: 'passenger' }
            });
          } else {
            next({ name: 'network-error-view' });
          }
        }
      },
      children: [
        {
          path: '',
          name: 'passenger-detail-view',
          component: PassengerDetailView,
          props: true,
          children: [
            {
            path: 'airline/:airlineId',
            name: 'airline-detail-view',
            component: AirlineDetailView,
            props: true
            }
          ]
        },
        {
          path: 'register',
          name: 'passenger-register-view',
          component: PassengerRegisterView,
          props: true
        },
        {
          path: 'edit',
          name: 'passenger-edit-view',
          component: PassengerEditView,
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach(() => {
  nProgress.start();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;
