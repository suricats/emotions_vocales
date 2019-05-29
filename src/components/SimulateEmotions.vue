<template>
    <div>
        <load-audio v-on:analyse="SimulateEmotions"/>
    </div>
</template>

<script>
import LoadAudio from '@/components/LoadAudio.vue'

export default {
    components: {
        LoadAudio
    },
    data: function () {
        return {
            audio: LoadAudio.data.audio
        }
    },
    methods: {
        async SimulateEmotions (audio) {
            this.audio = audio
            /* eslint-disable no-console */
            //var file = new File([this.audio], "audio.wav", {type: contentType, lastModified: Date.now()});
            console.log("apikey : " + process.env.VUE_APP_API_KEY);
            console.log("audio : " + this.audio);
            var formData = new FormData();
            formData.append("apikey", process.env.VUE_APP_API_KEY);
            formData.append("wav", this.audio);
            const response = await this.$http.post('',formData)
            console.log('get the following : ' + response)
        }
    },
}
</script>


<style>

.buton-validate {
    margin-top: 30px;
    height : 30px;
    background-color: #de1300;
    color: #ffffff;
}

</style>