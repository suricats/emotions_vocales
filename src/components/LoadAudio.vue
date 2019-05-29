<template>
    <div>
        <h1 class="title">
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
                <audio-player file=this.audio></audio-player>
            </div>
        </div>
        <button class="buton-validate" v-on:click="$emit('analyse', audio)">
            Annalyser
        </button>
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            audio: Object,
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
                        //var options = {mimeType: 'audio/x-wav'};
                        that.mediaRecorder = new MediaRecorder(stream);
                        //that.mediaRecorder.setAudioSamplingRate(11025);
                        //that.mediaRecorder.setAudioChannels(1);
                        that.mediaRecorder.start();
                        that.isRecording = true
                        console.log("Recording...")
                        that.mediaRecorder.ondataavailable = function(event) {
                            that.recordingData.push(event.data);
                        }
                        that.mediaRecorder.onstop = function(event) {
                            console.log('Media recorder stopped ' + event);
                            that.mediaRecorder.stop();
                            that.isRecording = false;
                            const blob = new Blob(that.recordingData, { type: 'audio/wav'});
                            that.audio = that.blobToFile(blob, "audio.wav")
                            //that.audio = window.URL.createObjectURL(blob);
                            console.log("audio : " + that.audio);
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

.title {
    text-align: center;
    color: #008991
}

.title-secondary {
    margin-top: 50px;
    width : 75%;
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
    border-radius: 50%;
    padding: 30px;
    border: 5px solid #de1300;
}

.img-record {
    border-radius: 50%;
    height: 150px;
    width: 150px;
}


</style>