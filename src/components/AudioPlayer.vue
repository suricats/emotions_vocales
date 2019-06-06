
<template>
    <div class="audio-container" v-if="created">
        <div v-if="!audioObject.paused">
            <img class="icon" :src="'pause.png'" v-on:click="pauseAudio"/>
        </div>
        <div v-else>
            <img class="icon" :src="'play.png'" v-on:click="playAudio">
        </div>
        <div id="sound-line" class="sound-line">
            <v-slider 
                v-model="audioObject.currentTime"
          ></v-slider>
        </div>
        <div id="sound-duration">
        </div>
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            isPlaying: false,
            timePlaying: 0,
            audioObject: null,
            created: false
        }
    },
    methods: {
        audioRecorded(audioUrl) {
            this.audioObject = new Audio(audioUrl);
            this.audioObject.src = audioUrl;
            this.audioObject.controls = true;
            const that = this;
            this.audioObject.addEventListener("loadeddata", function() {
                that.created = true;                
            });
            
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