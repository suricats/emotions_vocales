
<template>
    <div class="audio-container" v-if="created">
        <div >
            <img id="play" class="icon" :src="'pause.png'" v-on:click="pauseAudio"/>
        </div>
        <div>
            <img id="pause" class="icon" :src="'play.png'" v-on:click="playAudio">
        </div>
        <div id="sound-line" class="sound-line">
            <v-slider
                :v-model="audioObject.currentTime"
                :max="audioObject.duration"
                min=0
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
            start: 0,
            audioObject: null,
            created: false
        }
    },
    methods: {
        audioRecorded(audio) {
            this.audioObject = audio;
            this.audioObject.controls = true;
            const that = this;
            this.audioObject.addEventListener("loadeddata", function() {
                that.created = true;
            });
        },
        playAudio() {
            this.audioObject.play()
            console.log(this.audioObject)
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

#play:active, #pause:active {
    border-radius: 30px;
    border: 5px solid #00442a;  
}


.sound-line {
    float: left;
    margin-left: 20px;
}


</style>