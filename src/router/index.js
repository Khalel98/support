import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/appeal',
    name: 'appeal',
    component: () => import('../views/appeal/AppealView.vue'),
  },
  {
    path: '/appeal/new',
    component: () => import('../views/appeal/NewAppealView.vue'),
  },
  {
  path: '/appeal/expectation',
    component: () => import('../views/appeal/ExpectationAppealView.vue'),
  },
  {
    path: '/appeal/answered',
    component: () => import('../views/appeal/AnsweredAppealView.vue'),
  },
  {
    path: '/appeal/completed',
    component: () => import('../views/appeal/CompletedAppealView.vue'),
  },
  {
    path: '/appeal/overdue',
    component: () => import('../views/appeal/OverdueAppealView.vue'),
  },

  {
    path: '/users',
    name: 'users',
    component: () => import('../views/users/UsersView.vue'),
  },
  {
    path: '/users/all',
    component: () => import('../views/users/AllUsersView.vue'),
  },
  {
    path: '/users/profile',
    component: () => import('../views/users/ProfileView.vue'),
  },
  {
    path: '/users/moderator',
    component: () => import('../views/users/ModeratorView.vue'),
  },
  {
    path: '/organization',
    name: 'organization',
    component: () => import('../views/organization/OrganizationView.vue'),
  },
  {
    path: '/organization/all',
    component: () => import('../views/organization/AllOrganizationView.vue'),
  },

  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/settings/SettingsView.vue'),
  },
  {
    path: '/settings/category',
    component: () => import('../views/settings/CategoryView.vue'),
  },
  {
    path: '/settings/subcategory',
    component: () => import('../views/settings/SubCategoryView.vue'),
  },
  {
    path: '/action',
    component: () => import('../views/ActionView.vue'),
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
