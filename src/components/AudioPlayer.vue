
<template>
    <div class="audio-container" v-if="audioObject">
        <!--<audio
        controls
        :src="audioObject">
            Your browser does not support the
            <code>audio</code> element.
        </audio>-->
        <div v-if="!audioObject.paused">
            <img class="icon" :src="'pause.png'" v-on:click="pauseAudio"/>
        </div>
        <div v-else>
            <img class="icon" :src="'play.png'" v-on:click="playAudio">
        </div>
        <div class="sound-line">
            <!--<input type="range" id="volume-bar" min="0" max="10" step="1" v-model="audioObject.currentTime">-->
            <v-slider
                v-model="audioObject.currentTime"
          ></v-slider>
        </div>
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            isPlaying: false,
            timePlaying: 0,
            audioObject: null
        }
    },
    methods: {
        audioRecorded(audioUrl) {
            this.audioObject = new Audio(audioUrl);
            console.log(audioUrl)
            this.audioObject.src = audioUrl;
            this.audioObject.controls = true;
            //this.audioObject.play()
        },
        playAudio() {
            this.audioObject.play()            
        },
        pauseAudio() {
            this.audioObject.pause()
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