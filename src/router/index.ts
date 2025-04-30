import { createRouter, createWebHistory } from 'vue-router'
import CharacterList from '../views/CharacterList.vue'

const routes = [
  {
    path: '/',
    name: 'Characters',
    component: CharacterList,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
