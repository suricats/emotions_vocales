<template>
    <div class="card">
        <div class="first-row">
            <p> {{this.type}} </p>
            <img class="img-delete" v-on:click="onDelete" :src="'x-button.png'">
        </div>
        <div ref="container" class="container">
        </div>
    </div>
</template>

<script>
import RecordAudio from '@/components/RecordAudio.vue'
import Vue from 'vue'

export default {
    name: 'AnalyseInstance',
    props: ['type', 'idx', 'delete'],
    data: function () {
        return {
        }
    },
    components: {
        RecordAudio
    },
    mounted() {
        this.createAnalyser()
    },
    methods: {
        onDelete (event) {
            this.delete(this.idx)
        },
        createAnalyser() {
            var ComponentClass = Vue.extend(RecordAudio)
            var instance = new ComponentClass({})
            instance.$mount() // pass nothing
            this.$refs.container.appendChild(instance.$el)
        }

    },
}
</script>

<style>
.card {
    width: 70%;
    position: relative;
    margin: 10px 0;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 10px;
    
}

.card:hover {
    box-shadow: 0 12px 20px 0 rgba(0,0,0,0.2);
}

.first-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.img-delete {
    height: 28px;
    width: 28px;
}

</style>