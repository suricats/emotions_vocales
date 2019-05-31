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
                <audio-player :file="audio" ref="player"></audio-player>
            </div>
        </div>
        <div class="submit-container">
        <button class="buton-validate" v-on:click="$emit('analyse', audio)">
            Annalyser
        </button>
        </div>
    </div>
</template>


<script>
import AudioPlayer from '@/components/AudioPlayer.vue'


export default {
    data: function () {
        return {
            audio: Object,
            audioUrl: "",
            audioMP3: Object,
            isRecording: false,
            recordingData: [],
            mediaRecorder: null
        }
    },
    components: {
        AudioPlayer
    },
    methods: {
        OnClickRecord() {
            /* eslint-disable no-console */
            if (!this.isRecording) {
                const that = this;
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                navigator.getUserMedia({
                    audio: true,
                    video: false
                    },function(stream) {
                        var options = {
                            mimeType : 'audio/ogg'
                        }    
                        that.mediaRecorder = new MediaRecorder(stream, options);
                        that.mediaRecorder.start();
                        that.isRecording = true
                        that.mediaRecorder.ondataavailable = function(event) {
                            that.recordingData.push(event.data);
                        }
                        that.mediaRecorder.onstop = function(event) {
                            that.isRecording = false;
                            const blob = new Blob(that.recordingData, {type : 'audio/ogg'});
                            that.audio = that.blobToFile(blob, "audio")
                            that.audioUrl = URL.createObjectURL(blob);
                            
                            that.audioRecorded(that.audioUrl)
                        }
                    },function(error) {
                        alert("Vous devez autoriser l'application à accèder à votre microphone " + error);
                    });
            } else {
                this.isRecording = false;
                this.mediaRecorder.stop();
                console.log("Stop Recording")
            }
        },
        blobToFile(theBlob, fileName){
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return theBlob;
        },
        audioRecorded() {
            this.$refs.player.audioRecorded()
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
    width: 100px; 
    background-color: #de1300;
    color: #ffffff;
    border-radius: 10%;
}
</style>