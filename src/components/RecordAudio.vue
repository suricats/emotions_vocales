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

export default {
    data: function () {
        return {
            audioFile: Object,
            audioUrl: "",
            audio: Object,
            isRecording: false,
            recordingData: [],
            mediaRecorder: null
        }
    },
    components: {
        AudioPlayer,
        Analyser
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
                        /* Prioriser les types de fichiers audio, vérifier le premier supporté par le navigateur */
                        const mime = ['audio/ogg', 'audio/wav', 'audio/webm', 'audio/ogg']
                            .filter(MediaRecorder.isTypeSupported)[0];
                        var options = {
                            mimeType : mime
                        }    
                        that.mediaRecorder = new MediaRecorder(stream, options);
                        that.mediaRecorder.start();
                        that.isRecording = true
                        that.mediaRecorder.ondataavailable = function(event) {
                            that.recordingData.push(event.data);
                        }
                        that.mediaRecorder.onstop = function(event) {
                            that.isRecording = false;
                            const blob = new Blob(that.recordingData, {'type' : 'audio/wav'});
                            that.audioFile = that.blobToFile(blob, "audio")
                            console.log("this is not supposed to be a blob " + that.audioFile)
                            that.audioUrl = URL.createObjectURL(blob);
                            that.audio = new Audio(that.audioUrl);
                            //that.audio.play()
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
        audioRecorded(audio) {
            this.$refs.player.audioRecorded(audio)
        },
        initialize(data) {
            this.$refs.analyser.initialize(data)
        },
        async SimulateEmotions () {
            /* eslint-disable no-console */
            //var file = new File([this.audio], "audio.wav", {type: contentType, lastModified: Date.now()});
            console.log("apikey : " + process.env.VUE_APP_API_KEY);
            console.log("audio : " + this.audioFile);
            var formData = new FormData();
            formData.append("apikey", process.env.VUE_APP_API_KEY);
            formData.append("wav", this.audioFile);
             try {
                response = await this.$http.post('',formData)
                console.log(response)
                console.log(response.data)
                this.initialize(response.data)
            } catch (e) {
                console.log(e)
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