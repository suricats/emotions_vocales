<template>
  <v-app>
    <navbar></navbar>
    <log-in v-if="isNotLogged" />
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
    }
  },
  computed: {
    isNotLogged() {
      return (!Cookies.get('logged') && !this.$store.state.logged  ? true : false);
    }
  }
}
</script>
