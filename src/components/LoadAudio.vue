<template>
    <div>
    <audio-list v-show="showListMSodal" v-on:close="audioRecorded"/>
        <div class="result-container">
            <div class="analyse-container" id="analyser-container" ref="container">
            </div>
            <div id="audio" class="player-wrapper">
                <audio-player ref="player"></audio-player>
            </div>
        </div>
    </div>
</template>


<script>
import anger1 from '../assets/audio/anger9.wav'
import anger2 from '../assets/audio/anger10.wav'
import anger3 from '../assets/audio/anger11.wav'
import sad1 from '../assets/audio/sad8.wav'
import sad2 from '../assets/audio/sad10.wav'
import joy1 from '../assets/audio/joy5.wav'
import joy2 from '../assets/audio/joy7.wav'
import joy3 from '../assets/audio/joy8.wav'
import discours from '../assets/audio/discours.wav'

import AudioList from '@/components/AudioList.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import Analyser from '@/components/Analyser.vue'
import wav from '@/plugins/wav.js'
import Vue from 'vue'

export default {
    props: ['idx'],
    data: function () {
        return {
            showListMSodal: true,
            audioFile: Object,
            audioUrl: "",
            audio: Object,
            audioList: [],
            analyser: null
        }
    },
    components: {
        AudioPlayer,
        AudioList,
        Analyser
    },
    methods: {
        audioRecorded(audio) {
            console.log(audio)
            this.showListMSodal = false

            var ComponentClass = Vue.extend(Analyser)
            this.analyser = new ComponentClass({propsData: { idx: this.idx}})
            this.analyser.$mount() // pass nothing
            this.$refs.container.appendChild(this.analyser.$el)


            this.audioUrl = audio.src
            this.audio = new Audio(this.audioUrl);
            this.SimulateEmotions()
            this.$refs.player.audioRecorded(this.audio)
            this.clean()
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
            this.analyser.initialize(data)
        },
        clean() {
            this.analyser.clean()
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
            var duration = this.audio.duration

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

            var sStart = 0;
            var sRead = 0;
            var duration = this.audio.duration

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
    width: 30%;
    margin-left: 30px;
}

.audio-item {
    border-bottom: 2px solid #727272;
    margin-top: 10px;
    margin-bottom: 10px;
    list-style-type: none;
    font-size: 15px;
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