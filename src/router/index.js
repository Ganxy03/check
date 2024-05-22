import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../components/User/UserHome.vue')
  },
  {
    path: '/vacate',
    name: 'vacate',
    component: () => import('../components/User/UserVacate.vue')
  },
  {
    path: '/inspect',
    name: 'inspect',
    component: () => import('../components/User/UserInspect.vue')
  },
  {
    path: '/manager',
    name: 'manager',
    component: () => import('../components/User/UserManager.vue')
  },
  {
    path: '/manager/member',
    name: 'member',
    component: () => import('../components/Manager/MemberManager.vue')
  },
  {
    path: '/manager/clockIn',
    name: 'clockIn',
    component: () => import('../components/Manager/ClockInManager.vue')
  },
  {
    path: '/manager/inspectRecord',
    name: 'inspectRecord',
    component: () => import('../components/Manager/InspectRecord.vue')
  },
  {
    path: '/manager/problemRecord',
    name: 'problemRecord',
    component: () => import('../components/Manager/ProblemRecord.vue')
  },
  {
    path: '/manager/taskmanager',
    name: 'taskmanager',
    component: () => import('../components/Manager/TaskManager.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../components/User/PersonalPage.vue')
  },
]

const router = new VueRouter({
  base: '',
  mode: 'history',
  routes
})

export default router
