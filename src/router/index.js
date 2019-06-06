import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/components/MainPage'
import Record from '@/components/RecordAudio'
import Library from '@/components/LoadAudio'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        name: 'MainPage',
        component: MainPage
      },
      {
        path: '/record',
        name: 'RecordAudio',
        component: Record
      },
      {
        path: '/library',
        name: 'LoadAudio',
        component: Library
      },
      {
        path: '*',
        redirect: '/library'
      }
    ]
  });
  