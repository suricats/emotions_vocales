<template>
    <div>
        <h1 class="record-title">
            Mes Emotions
        </h1>
        <div class="title-container">
            <h3 class="title-secondary"> Ici vous pouvez vous enregistrer et écouter votre enregistrement. Lorsque vous êtes prêts,
                soumetez le et observez l'évolution de vos émotions ! </h3>
        </div>
        <div class="record-container">
            <div class="btn-record">
                <img class="img-record" v-bind:class="{ 'recording': isRecording }" :src="'microphone.png'" v-on:click="OnClickRecord">
            </div>
            <div id="audio" class="player-wrapper">
                <audio-player ref="player"></audio-player>
            </div>
        </div>
        <div class="submit-container" v-if="audioUrl">
            <button class="buton-validate" v-on:click="SimulateEmotions">
                Annalyser
            </button>
        </div>
        <div class="score-container">
            <analyser ref="analyser"></analyser>
        </div>
    </div>
</template>


<script>
import AudioPlayer from '@/components/AudioPlayer.vue'
import Analyser from '@/components/Analyser.vue'
import wav from '@/plugins/wav.js'

export default {
    data: function () {
        return {
            audioFile: Object,
            audioUrl: "",
            audio: Object,
            isRecording: false,
            recordingData: [],
            mediaRecorder: null,
            start: null,
            duration: 0
        }
    },
    components: {
        AudioPlayer,
        Analyser
    },
    methods: {
        OnClickRecord() {
            this.recordingData = [];
            /* eslint-disable no-console */
            if (!this.isRecording) {
                const that = this;
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                navigator.getUserMedia({
                    audio: { channelCount: 1, sampleRate: 11025, sampleSize: 16}
                    },function(stream) {
                        const mime = ['audio/wav'] 
                            .filter(MediaRecorder.isTypeSupported)[0];
                        var options = {
                            mimeType : mime
                        }    
                        that.mediaRecorder = new MediaRecorder(stream, options);
                        that.start = Date.now();
                        console.log("start recording : " + that.start)
                        that.mediaRecorder.start();
                        that.isRecording = true
                        that.mediaRecorder.ondataavailable = function(event) {
                            that.recordingData.push(event.data);
                        }
                        that.mediaRecorder.onstop = function(event) {
                            that.isRecording = false;
                            that.duration = Math.floor((Date.now() - that.start) / 1000); // Duration in seconds
                            console.log("duration : " + that.duration)
                            const blob = new Blob(that.recordingData, {'type' : 'audio/wav'});

                            console.log(blob)
                            that.audioUrl = URL.createObjectURL(blob);
                            // This will modify the sample rate 
                            const resampler = require('audio-resampler');
                            resampler(that.audioUrl, 11025, function(event){
                                event.getFile(function(fileEvent){
                                    that.audioUrl = fileEvent;
                                    that.audio = new Audio(that.audioUrl);
                                    that.audioRecorded(that.audio)
                                });
                            });
                        }
                    },function(error) {
                        alert("Vous devez autoriser l'application à accèder à votre microphone " + error);
                    });
            } else {
                this.isRecording = false;
                this.mediaRecorder.stop();
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
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async SliceWav(wavFile) {
            var sStart = 0;
            var sRead = 0;
            var duration = this.duration
            
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
}

.btn-record {
    margin-top: 30px;
    height: 100%;
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
</style>