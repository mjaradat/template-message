import { createRouter, createWebHistory } from 'vue-router'
import Input from './docs/input.vue' // Example component, adjust as needed
import Layout from './layouts/Layout.vue'
import Select from './docs/select.vue'
import VisualSelect from './docs/visual-select.vue'
import RadioButtons from './docs/radio-buttons.vue'
import Preview from './docs/preview.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '/input',
        name: 'input',
        component: Input
      },
      {
        path: '/select',
        name: 'select',
        component: Select
      },
      {
        path: '/visual-select',
        name: 'visual-select',
        component: VisualSelect
      },
      {
        path: '/radio-buttons',
        name: 'radio-buttons',
        component: RadioButtons
      },
      {
        path: '/preview',
        name: 'preview',
        component: Preview
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
