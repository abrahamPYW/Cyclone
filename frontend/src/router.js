import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import Participants from './views/Participants.vue'
import Sponsers from './views/Sponsers.vue'
import Driven from './views/Driven.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/participantes',
          name: 'participants',
          component: Participants
        },
        {
          path: '/patrocinios',
          name: 'sponsers',
          component: Sponsers
        },
        {
          path: "/manejado",
          name: "driven",
          component: Driven
        }
      ]
    }
  ]
})
