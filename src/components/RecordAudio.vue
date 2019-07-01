<template>
    <div>
        <div class="record-container">
            <div class="btn-record">
                <img class="img-record" v-bind:class="{ 'recording': isRecording }" :src="'microphone.png'" v-on:click="OnClickRecord">
            </div>
            <div class="result-container">
                <div class="analyse-container" id="analyser-container" ref="container">
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
import Vue from 'vue'

export default {
    props: ['idx'],
    data: function () {
        return {
            isRecording: false,
            recordingData: [],
            intervalId: null,
            recorder: null,
            blobs: [],
            start: null,
            recordedChunks: [],
            analyser: null
        }
    },
    components: {
        AudioPlayer
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
        StartRecording(that, stream) {
            var chunk = [];
            const mime = ['audio/wav'] 
                .filter(MediaRecorder.isTypeSupported)[0];
            var options = {
                mimeType : mime
            }
            var recorder = new MediaRecorder(stream);
            recorder.ondataavailable = function(event) {
                chunk.push(event.data)
                that.recordedChunks.push(event.data)
            }

            recorder.onstop = function(event) {
            const blob = new Blob(chunk, options);
            that.blobs.push(blob)
            var audioUrl = URL.createObjectURL(blob);

            const resampler = require('audio-resampler');
            resampler(audioUrl, 11025, function(event){
                event.getFile(function(fileEvent){
                    that.SimulateEmotions(fileEvent)
                });
            });
            }
            setTimeout(() => recorder.stop(), 3000); // we'll have a 3s media file
            recorder.start();
            that.isRecording = true;
        },
        StopRecording() {
            this.isRecording = false;
            //this.recorder.stop()

        
            clearInterval(this.intervalId);
            this.duration = Math.floor((Date.now() - this.start) / 1000); // Duration in seconds
            var blob = new Blob(this.recordedChunks)
            var audioUrl = URL.createObjectURL(blob);

            const resampler = require('audio-resampler');
            var that = this;
            resampler(audioUrl, 11025, function(event){
                event.getFile(function(fileEvent){
                    that.audioUrl = fileEvent;
                    that.audio = new Audio(that.audioUrl);
                    that.audioRecorded(that.audio)
                });
            });
        },
        OnClickRecord() {
            if (this.isRecording === true) {
                this.StopRecording();
            } else {
                this.start = Date.now()
                this.recordingData = [];

                var ComponentClass = Vue.extend(Analyser)
                this.analyser = new ComponentClass({propsData: { idx: this.idx}})
                this.analyser.$mount() // pass nothing
                this.$refs.container.appendChild(this.analyser.$el)

                var that = this;
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                navigator.getUserMedia({
                    audio: { channelCount: 1, sampleRate: 11025, sampleSize: 16}
                },function(stream) {
                    that.StartRecording(that, stream)
                    that.intervalId = setInterval( function() { that.StartRecording(that, stream); }, 3000);
                },function(error) {
                    alert("Vous devez autoriser l'application à accèder à votre microphone " + error);
                })
            }
        },
        blobToFile(theBlob, fileName){
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return theBlob;
        },
        audioRecorded(audio) {
            this.$refs.player.audioRecorded(audio)
        },
        initialize(data) {
            this.analyser.initialize(data)
        },
        async SimulateEmotions (url) {
            
            let blob = await fetch(url).then(r => r.blob());

            var formData = new FormData();

            formData.append("wav", this.blobToFile(blob, "audio"));
            formData.append("apikey", process.env.VUE_APP_API_KEY);

            try {
                const response = await this.$http.post('',formData)
                this.initialize(response.data)
            } catch (e) {
                console.log(e) // Maybe in the futur it will be an alert
            }
        }
    }
}
</script>

<style scoped>

html,
body {
  height: 100%;
}


.record-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

@media screen and (max-width: 600px) {
  .record-container {
    flex-direction: column;
  }
}

.btn-record {
    margin-top: 30px;
    border-radius: 50%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media screen and (max-width: 600px) {
.btn-record {
    margin-top: 30px;
    border-radius: 50%;
    width: 100%;
}
}

.recording {
    padding: 10px;
    border: 3px solid #de1300 !important;
}

.img-record {
    border-radius: 50%;
    padding: 5px;
    border: 2px solid #009157;
    height: 120px;
    width: 120px;

}

@media screen and (max-width: 600px) {
  .img-record {
      height: 90px;
      width: 90px;
  }
}

.player-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}


.result-container {
    width: 80%;
    display: flex;
    align-items: row;
    justify-content: center;
}

@media screen and (max-width: 600px) {
    .result-container {
        margin-top: 30px;
        border-radius: 50%;
        width: 100%;
    }
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
</style>