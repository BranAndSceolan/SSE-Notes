import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DocumentListView from '../views/DocumentListView.vue'
import DocumentView from '../views/DocumentView.vue'
import SearchView from '../views/SearchView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  },
  {
    path: '/documents',
    name: 'documentList',
    component: DocumentListView
  },
  {
    path: '/documents/:document_id',
    name: 'document',
    component: DocumentView
  },
  {
    path: '/search',
    name: 'search',
    //query parameters are not defined at all in Vue
    component: SearchView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
