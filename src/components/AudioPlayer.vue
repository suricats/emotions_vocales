
<template>
    <div class="audio-container" v-if="created">
        <div >
            <img id="play" class="icon" :src="'pause.png'" v-on:click="pauseAudio"/>
        </div>
        <div>
            <img id="pause" class="icon" :src="'play.png'" v-on:click="playAudio"/>
        </div>
        <div id="sound-line" class="sound-line">
            <v-slider
                :v-model="audioObject.currentTime"
                :max="audioObject.duration"
                min=0
            ></v-slider>
        </div>
        <div>
            <img id="download" class="icon" :src="'download.png'" v-on:click="downloadAudio"/>
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
        },
        pauseAudio() {
            this.audioObject.pause()
        },
        download(filename, src) {
            this.$axios.get(src, { responseType: 'blob' })
                .then(({ data }) => {
                    let blob = new Blob([data], { type: 'audio/wav' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = filename
                    if (typeof InstallTrigger !== 'undefined') // Es qu'on est sur firefox ? 
                        link.dispatchEvent(new MouseEvent(`click`, {bubbles: true, cancelable: true, view: window}));
                    else
                        link.click()
                .catch(error => {
                    console.error(error)
                })
            })
        },
        downloadAudio() {
            this.download("audio.wav", this.audioObject.src);
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
    margin-left: 5px;
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