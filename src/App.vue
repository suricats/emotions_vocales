<template>
  <v-app>
    <load-audio/>
  </v-app>
</template>

<script>
import LoadAudio from './components/LoadAudio'

export default {
  name: 'App',
  components: {
    LoadAudio
  },
  data () {
    return {
      //
    }
  }
}
</script>
