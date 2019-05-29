
<template>
    <div class="audio-container">
        <div class="icon">
            <img/>
        </div>
        <div class="sound-line">
        </div>
    </div>
</template>


<script>
export default {
    props: ['file']
    data: function () {
        return {
            isPlaying: false,
            timePlaying: 0
        }
    },
    methods: {
        playAudio() {

        }
    }
}
</script>

<style>

</style>