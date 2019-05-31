
<template>
    <div class="audio-container">
        <p> {{audio.currentTime}} </p>
        <div v-if="isPlaying" >
            <img class="icon" :src="'pause.png'"/>
        </div>
        <div v-else >
            <img class="icon" :src="'play.png'">
        </div>
        <div class="sound-line">
            <v-slider
                v-model="timePlaying"
            ></v-slider>
        </div>
        <p> {{audio.duration}} </p>
    </div>
</template>


<script>
export default {
    props: ['file'],
    data: function () {
        return {
            isPlaying: false,
            timePlaying: 0,
            audio: Object
        }
    },
    methods: {
        audioRecorded(blobURL) {
            this.audio = new Audio(blobURL);
            this.audio.play()
            console.log("i create the audio : " + this.audio.currentSrc)
        },
        playAudio() {

        }
    }
}
</script>

<style>
.audio-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon {
    float: left;
    width: 30px;
}

.sound-line {
    float: left;
    margin-left: 20px;
}


</style>