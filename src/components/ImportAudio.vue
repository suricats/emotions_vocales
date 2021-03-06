<template>
    <div>
        <div class="import-audio-container">
            <div class="import-container">
                <input class="input-file" id="loadFile" type="file"
                v-on:change="verifyFile"/>
            </div>
            <div class="result-container">
                <div class="analyse-container" id="analyser-container" ref="container">
                    <analyser ref="analyser"/>
                </div>
                <div id="audio" class="player-wrapper">
                    <audio-player ref="player"></audio-player>
                </div>
            </div>
        </div>
    </div>
</template>

<script>



import AudioPlayer from '@/components/AudioPlayer.vue'
import Analyser from '@/components/Analyser.vue'
import wav from '@/plugins/wav.js'
import resampler from '@/plugins/resampler.js'

export default {
    props: ['idx'],
    data: function () {
        return {
            audioFile: Object,
            audioUrl: "",
            audio: Object
        }
    },
    components: {
        AudioPlayer,
        Analyser
    },
    created() {
        window.eventBus.$on('add-card', value => {
            this.idx += 1
        }),
        window.eventBus.$on('delete-card', value => {
            if (value < this.idx) {
                this.idx -= 1
            }
        })
    },    
    methods: {
        verifyFile() {
            const audioInput = document.getElementById("loadFile");

            if (audioInput.value != '' && audioInput.value != undefined && audioInput.files) {
                var fReader = new FileReader();
                fReader.readAsDataURL(audioInput.files[0]);
                window.eventBus.$emit('update-name', {name: audioInput.files[0].name, idx: this.idx})
                var that = this
                fReader.onloadend = function(event){
                    that.audioUrl = event.target.result;
                    that.audio = new Audio(that.audioUrl);
                    that.$refs.player.audioRecorded(that.audio)
                    that.clean()
                    resampler(that.audioUrl, 11025, function(event){
                        event.getFile(function(fileEvent){
                            that.audioUrl = fileEvent
                            that.SimulateEmotions()
                        });
                    });
                }
                
            }
        },
        cleanSelected() {
            document.querySelector('input').value = "";
            document.querySelector('input').files = ""
        },
        stopAudio() {
            if (this.audio && this.audio.src) {
                this.audio.pause()
            }
        },
        blobToFile(theBlob, fileName) {
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return theBlob;
        },
        // This funtion was totally stolen (or collectivized according to your political opinion)
        dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {type: 'audio/wav'});
        },
        initialize(data) {
            this.$refs.analyser.initialize(data)
        },
        clean() {
            this.$refs.analyser.clean()
        },
        async success(wavFile) {
            var blob = new Blob([wavFile], {type: 'audio/wav'});

            var formData = new FormData();

            formData.append("wav", this.blobToFile(blob, "audio"));
            formData.append("apikey", process.env.VUE_APP_API_KEY);

            try {
                const response = await this.$http.post('',formData)
                this.initialize(response.data)
            } catch (e) {
                console.log(e) // Maybe in the futur it will be an alert
            }

        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async SliceWav(wavFile) {
            var sStart = 0;
            var sRead = 0;
            var duration;
            
            if (this.audio.duration === null || this.audio.duration === undefined || this.audio.duration > 30) {
                duration = 5
            } else {
                duration = this.audio.duration;
            }

            while (sStart < duration) {     
                if (sStart + 5 > duration) {
                    sRead = duration - sStart;
                } else {
                    sRead = 5;
                }

                if (sRead === 0) {break;}

                await wavFile.slice(sStart, sRead, this.success);
                await this.sleep(5000)

                sStart = sStart + sRead
            }
        },
        async SimulateEmotions () {
            /* eslint-disable no-console */
            let blob = await fetch(this.audioUrl).then(r => r.blob());

            var wavFile = new wav(blob);
            this.audio.play()
            var that = this

            wavFile.onloadend = function () {
                that.SliceWav(this)
            };
        }
    }
}
</script>
<style scoped>

html,
body {
  height: 100%;
}

.import-container {
    width: 20%;
}

@media screen and (max-width: 600px) {
    .import-container {
        width: 100%;
    }
}


.import-audio-container {
    display: flex;
    align-items: center;
    justify-content: center;
}


@media screen and (max-width: 600px) {
    .import-audio-container {
        flex-direction: column;
    }
}


.audio-item {
    border-bottom: 2px solid #727272;
    margin-top: 10px;
    margin-bottom: 10px;
    list-style-type: none;
    font-size: 15px;
}
.player-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.score-container {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.analyse-container {
    width: 90%;
    height: 250px;
    background-color: #ededed;
}

@media screen and (max-width: 600px) {
    .analyse-container {
        width: 90%;
        height: 450px;
        background-color: #ededed;
    }
}

.result-container {
    width: 80%;
    display: flex;
    align-items: row;
    justify-content: center;
}

.input-file {
    width: 100%;
}

@media screen and (max-width: 600px) {
    .result-container {
        margin-top: 30px;
        border-radius: 50%;
        width: 100%;
    }
}
</style>