import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DocumentListView from '../views/DocumentListView.vue';
import DocumentView from '../views/DocumentView.vue';
import SearchView from '../views/SearchView.vue';
import CreateDocumentView from '../views/CreateDocumentView.vue';
import {API} from '@/services/API-Service';
import ImprintView from '../views/ImprintView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
  },
  {
    path: '/create',
    name: 'create',
    component: CreateDocumentView
  },
  {
    path: '/imprint',
    name: 'imprint',
    component: ImprintView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = "SSE Notes"; //can load title dynamically from the "to" object
  next();
});

router.afterEach(() => {
  API.getCsrfToken();
});

export default router
