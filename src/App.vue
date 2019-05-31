<template>
  <v-app>
    <simulate-emotions/>
  </v-app>
</template>

<script>
import SimulateEmotions from './components/SimulateEmotions'

export default {
  name: 'App',
  components: {
    SimulateEmotions
  },
  data () {
    return {
      //
    }
  }
}
</script>
