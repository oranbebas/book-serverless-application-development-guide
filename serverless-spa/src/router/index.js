import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Photo from '@/components/Photo'
import Signup from '@/components/Signup'
import Confirm from '@/components/Confirm'
import Login from '@/components/Login'
import auth from '@/auth'
// import Photo from '@/components/Photo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/',
      name: 'root',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/photo',
      name: 'photo',
      component: Photo,
      beforeEnter: requireAuth
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    console.log('This is not logged in session.')
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  } else {
    console.log('This is valid session.')
    next()
  }
}
