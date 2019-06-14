<template>
    <div>
        <div class="record-container">
            <div class="btn-record">
                <img class="img-record" v-bind:class="{ 'recording': isRecording }" :src="'microphone.png'" v-on:click="OnClickRecord">
            </div>
            <div class="result-container">
                <div class="analyse-container" ref="container">
                    <component :is="Analyser" ref="analyser"></component>    
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
import Vue from 'vue'

export default {
    data: function () {
        return {
            isRecording: false,
            recordingData: [],
            intervalId: null,
            recorder: null,
            blobs: [],
            start: null,
            recordedChunks: []
        }
    },
    components: {
        AudioPlayer,
        Analyser
    },
    methods: {
        StartRecording(that, stream) {
            var chunk = [];
            const mime = ['audio/wav'] 
                .filter(MediaRecorder.isTypeSupported)[0];
            var options = {
                mimeType : mime
            }
            console.log(stream)
            var recorder = new MediaRecorder(stream);
            recorder.ondataavailable = function(event) {
                chunk.push(event.data)
                that.recordedChunks.push(event.data)
            }
            recorder.onstop = function(event) {
            const blob = new Blob(chunk, options);
            console.log(blob)
            that.blobs.push(blob)
            var audioUrl = URL.createObjectURL(blob);
            console.log(audioUrl)
            const resampler = require('audio-resampler');
            resampler(audioUrl, 11025, function(event){
                event.getFile(function(fileEvent){
                    that.SimulateEmotions(fileEvent)
                });
            });
            }
            setTimeout(()=> recorder.stop(), 3000); // we'll have a 3s media file
            recorder.start();
            that.isRecording = true;
        },
        StopRecording() {
            this.isRecording = false;
            //this.recorder.stop()

        
            clearInterval(this.intervalId);
            this.duration = Math.floor((Date.now() - this.start) / 1000); // Duration in seconds
            console.log("concat audio")
            var blob = new Blob(this.recordedChunks)
            var audioUrl = URL.createObjectURL(blob);
            console.log("final blob : " + audioUrl)

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
                var that = this;
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                navigator.getUserMedia({
                    audio: { channelCount: 1, sampleRate: 11025, sampleSize: 16}
                },function(stream) {
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
            console.log(this.analyser)
            this.$refs.analyser.initialize(data)
        },
        async success(wavFile) {
            var blob = new Blob([wavFile], {type: 'audio/wav'});

            console.log(URL.createObjectURL(blob))


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

<style>

html,
body {
  height: 100%;
}

.title-container {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.record-title {
    font-size: 30px;
    margin-top: 30px;
    text-align: center;
    color: #008991
}

.title-secondary {
    text-align: left;
    margin-top: 50px;
    width : 70%;
    color: #535353;
}

.record-container {
    display: flex;
    align-items: column;
    justify-content: center;
    height: 300px;
}

.btn-record {
    margin-top: 30px;
    height: 70%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
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

.player-wrapper {
    margin-left: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.submit-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.buton-validate {
    margin-top: 30px;
    height: 30px;
    width: 120px; 
    background-color: #de1300;
    color: #ffffff;
    border-radius: 10%;
}

.score-container {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.result-container {
    display: flex;
    align-items: row;
    justify-content: center;
}
</style>