import { createRouter, createWebHistory } from 'vue-router'
import CreateLayout from './layouts/CreateLayout.vue'
import VRouterView from './components/VRouterView.vue'

const routes = [
  {
    path: '/',
    name: 'template',
    component: VRouterView,
    children: [
      {
        path: '', // default route
        name: 'new-template-message',
        component: CreateLayout
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
