<template>
  <div class="modal-mask">
    <div class="modal-container">
      <div class="modal-header">
        <div name="header">
          Liste d'enregistrements
        </div>
      </div>
      <div class="modal-body">
        <div name="body">
            <ul id="audio-list">
                <li v-for="audio in audioList" v-on:click="audioSelected(audio)" class="audio-item">
                    {{ audio.innerText }}
                </li>
            </ul>        
        </div>
      </div>
      <div class="modal-footer">
        <div name="footer" class="footer">
            <button role="button" tabindex="1" class="modal-button-close"
            @click="closeModal">Valider</button>
            </div>
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

export default {
    name: 'Modal',
    data () {
        return {
            audio: Object,
            audioList: []
        }
    },
    created: function() {
        this.getAudios();
    },
    methods: {
        getAudios() {
            this.audioList.push(new Audio(anger1));
            this.audioList[this.audioList.length - 1].innerText = "angry woman";
            this.audioList.push(new Audio(anger2));
            this.audioList[this.audioList.length - 1].innerText = "really angry woman";
            this.audioList.push(new Audio(anger3));
            this.audioList[this.audioList.length - 1].innerText = "over angry woman";
            this.audioList.push(new Audio(sad1));
            this.audioList[this.audioList.length - 1].innerText = "sad woman";
            this.audioList.push(new Audio(sad2));
            this.audioList[this.audioList.length - 1].innerText = "sad man";
            this.audioList.push(new Audio(joy1));
            this.audioList[this.audioList.length - 1].innerText = "happy man";
            this.audioList.push(new Audio(joy2));
            this.audioList[this.audioList.length - 1].innerText = "happy woman";
            this.audioList.push(new Audio(joy3));
            this.audioList[this.audioList.length - 1].innerText = "really happy man";
            this.audioList.push(new Audio(discours));
            this.audioList[this.audioList.length - 1].innerText = "discours de l'abée Pierre";
        },
        audioSelected(audio) {
            this.audio = audio
            audio.play()
        },
        closeModal() {
            this.$emit('close', this.audio)
        }
    }
}
</script>

<style scoped>
.modal-button-close {
    color: #ededed;
    background-color: #008991;
    position: relative;
    /*
    --- inline blocks fucks up the side border from time to time, no idea why
    display: inline-block;
    */
    display: inline-table;
    outline: none !important;
    cursor: pointer;
    border-radius: 32px;
    margin-bottom: 30px;
    padding: 8px 30px;
    transition: all 0.5s;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19);
}

.modal-button-close:hover {
    text-decoration: none;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.modal-mask {
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, .30);
    display: flex;
    align-items: center;
    justify-content: center;
}
  
.modal-container {
    width: 70%;
    padding: 20px 30px 0 30px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}
.modal-header h3 {
    margin-top: 0;
    color: #008991;
}
.modal-body {
    margin: 20px 0;
}
.modal__button--close {
    cursor: pointer;
    margin: -20px -30px 0 0;
    padding: 0 7px; 
}

#audio-list {
    margin-left: 30px;
    margin-right: 30px;
}

.audio-item {
    border-bottom: 2px solid #727272;
    margin-top: 10px;
    margin-bottom: 10px;
    list-style-type: none;
    font-size: 15px;
}

.footer {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>