<template>
  <v-app>
    <navbar></navbar>
    <log-in v-if="!logged && this.$store.state.logged" />
    <router-view v-else></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import LogIn from './components/LogIn'
import Cookies from 'js-cookie';

export default {
  name: 'App',
  components: {
    Navbar,
    LogIn
  },
  data () {
    return {
      logged: Cookies.get('logged')
    }
  }
}
</script>
