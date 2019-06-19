<template>
  <v-app>
    <navbar></navbar>
    <log-in v-if="!this.$store.state.logged"/>
    <router-view v-else></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import LogIn from './components/LogIn'

export default {
  name: 'App',
  components: {
    Navbar,
    LogIn
  },
  data () {
    return {
      logged: false
    }
  }
}
</script>
