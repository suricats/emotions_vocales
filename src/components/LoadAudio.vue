<template>
    <div>
        <h1 class="load-title">
            Notre librairie
        </h1>
        <div class="title-container">
            <h3 class="title-secondary"> Nous avons séléctionné pour vous un ensemble d'éxtraits pour vous permettre de tester facilement la reconnaissance d'émotions vocales ! </h3>
        </div>
        <div class="load-audio-container">
            <div id="audio" class="player-wrapper">
                <audio-player ref="player"></audio-player>
            </div>
            <ul id="audio-list">
                <li v-for="audio in audioList" v-on:click="audioRecorded(audio)" class="audio-item">
                    {{ audio.innerText }}
                </li>
            </ul>
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
import anger1 from '../assets/audio/anger9.wav'
import anger2 from '../assets/audio/anger10.wav'
import anger3 from '../assets/audio/anger11.wav'
import AudioPlayer from '@/components/AudioPlayer.vue'
import Analyser from '@/components/Analyser.vue'

export default {
    data: function () {
        return {
            audioFile: Object,
            audioUrl: "",
            audio: Object,
            audioList: []
        }
    },
    created: function() {
        this.getAudios();
    },
    components: {
        AudioPlayer,
        Analyser
    },
    methods: {
        getAudios() {
            this.audioList.push(new Audio(anger1));
            this.audioList[this.audioList.length - 1].type = 'audio/wav';
            this.audioList[this.audioList.length - 1].innerText = "angry woman";
            this.audioList.push(new Audio(anger2));
            this.audioList[this.audioList.length - 1].innerText = "really angry woman";
            this.audioList.push(new Audio(anger3));
            this.audioList[this.audioList.length - 1].innerText = "over angry woman";
        },
        audioRecorded(audio) {
            this.audioUrl = audio.src
            this.$refs.player.audioRecorded(audio.src)
        },
        blobToFile(theBlob, fileName) {
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return theBlob;
        },
        dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

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
        async SimulateEmotions () {
            /* eslint-disable no-console */
            //var file = new File([this.audio], "audio.wav", {type: contentType, lastModified: Date.now()});



            /*let formData = new FormData();

            let blob = await fetch(this.audioUrl).then(r => r.blob());
            
            formData.append("wav", this.blobToFile(blob, "audio"));
            formData.append("apikey", process.env.VUE_APP_API_KEY);

            var url = new URL(process.env.VUE_APP_API_URL)


            console.log(url)
            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                body: formData,
            }).then(function(response) {
                console.log(response.status)
                    response.json().then(function(json){
                        console.log(json);
                    })
            });*/

            // the response is a promise
            


            /*var fs = require('fs');
            var request = require('request');
            const API_ENDPOINT = 'https://api.webempath.net/v2/analyzeWav';

            let blob = await fetch(this.audioUrl).then(r => r.blob());

            var formData = {
            apikey: process.env.VUE_APP_API_KEY,
            wav: this.blobToFile(blob, "audio")
            };
            request.post({ url: process.env.VUE_APP_API_URL, formData: formData }, function(err, response) {
                if (err) {

                    console.trace(err);
                } else {

                    var respBody = JSON.parse(response.body);

                    console.log("result: " + JSON.stringify(respBody));
                }
            });*/

            /*var formData = new FormData();

            let blob = await fetch(this.audioUrl).then(r => r.blob());
            
            formData.append("wav", this.blobToFile(blob, "audio"));
            console.log(blob)

            formData.append("apikey", process.env.VUE_APP_API_KEY);

            const req = new XMLHttpRequest();
            req.open('POST',  process.env.VUE_APP_API_URL, false);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.onload = function (e) {
            if (req.readyState === 4) {
                if (req.status === 200) {
                console.log(req.responseText);
                } else {
                console.error(req.statusText);
                }
            }
            };
            req.send(formData);*/
            
            console.log("apikey : " + process.env.VUE_APP_API_KEY);
            var formData = new FormData();

            let blob = await fetch(this.audioUrl).then(r => r.blob());
            
            formData.append("wav", this.blobToFile(blob, "audio"));
            console.log(blob)

            formData.append("apikey", process.env.VUE_APP_API_KEY);
            var response;
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

.load-title {
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

.load-audio-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

#audio-list {
    width: 20%;
    margin-left: 30px;
}

.audio-item {
    border-bottom: 1px solid #535353;
    margin-top: 10px;
    margin-bottom: 10px;
    list-style-type: none;
}
.player-wrapper {
    margin-left: 30px;
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
</style>