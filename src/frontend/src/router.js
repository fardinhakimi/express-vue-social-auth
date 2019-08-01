import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from './views/Dashboard.vue'
import jwt from 'jsonwebtoken'

import store from './store'

Vue.use(Router)

export const HOME_ROUTE = '/'
export const PROFILE_ROUTE = '/accounts/profile'

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: HOME_ROUTE,
      name: "home",
      component: Home
    },
    {
      path: PROFILE_ROUTE,
      name: "profile",
      component: Dashboard,
      meta: {
        authRequired: true
      }
    }
  ]
})

const isTokenValid = (token) => {

  const decodedToken = jwt.decode(token, { complete: true });

  console.log(token)

  return true;
}


router.beforeEach((to, from, next) => {

  const user = store.getters.user

  if (user.token) {

    if (to.meta.authBanned) {
      next({ path: from.path })
    } else if (to.meta.authRequired) {

      if (isTokenValid(user.token)) {

        next()

      } else {

        next({ path: HOME_ROUTE, query: { redirect: to.fullPath } })
      }

    } else {
      next()
    }

  } else {

    if (to.meta.authRequired) {
      next({ path: HOME_ROUTE, query: { redirect: to.fullPath } })
    } else {
      next()
    }
  }

})

export default router