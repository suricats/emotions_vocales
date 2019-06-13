import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/components/MainPage'
import Record from '@/components/RecordAudio'
import Library from '@/components/LoadAudio'
import Import from '@/components/ImportAudio'
import WelcomePage from '@/components/WelcomePage'


Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/main',
        name: 'MainPage',
        component: MainPage
      },
      {
        path: '/',
        name: 'WelcomePage',
        component: WelcomePage
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  });
  