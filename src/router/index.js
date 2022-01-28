import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Promoteur from "../views/Promoteur.vue"
import Promoteurs from "../views/Promoteurs.vue"
import Stages from "../views/Stages.vue"
import Stage from "../views/Stage.vue"
import Encadreurs from "../views/Encadreurs.vue"
import Etudiants from "../views/Etudiants.vue"
import Admin from "../views/Admin.vue"
import Statistique from "../views/Statistique.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/promoteur/:id',
    name: 'Promoteur',
    component: Promoteur
  },
  {
    path: '/promoteurs',
    name: 'Promoteurs',
    component: Promoteurs
  },
  {
    path: '/stages',
    name: 'Stages',
    component: Stages
  },
  {
    path: '/stage/:id',
    name: 'Stage',
    component: Stage
  },
  {
    path: '/encadreurs',
    name: 'Encadreurs',
    component: Encadreurs
  },
  {
    path: '/etudiants',
    name: 'Etudiants',
    component: Etudiants
  },
  {
    path: '/statistique',
    name: 'Statistique',
    component: Statistique
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
