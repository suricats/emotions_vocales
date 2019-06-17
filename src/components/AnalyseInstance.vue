<template>
    <div class="card">
        <div class="first-row">
            <h3 class="card-title"> {{type}} {{idx}} </h3>
            <div>
                <img class="img-delete" v-on:click="onDelete" :src="'x-button.png'">
                <img v-if="isShowed" class="img-open" v-on:click="isShowed = false" :src="'down-button.png'">
                <img v-if="!isShowed" class="img-open" v-on:click="isShowed = true" :src="'up-button.png'">
            </div>
        </div>
        <div ref="container" class="container" v-show="isShowed">
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import RecordAudio from '@/components/RecordAudio.vue'
import ImportAudio from '@/components/ImportAudio.vue'
import LoadAudio from '@/components/LoadAudio.vue'

export default {
    name: 'AnalyseInstance',
    props: ['type', 'idx', 'delete'],
    data: function () {
        return {
            isShowed: true
        }
    },
    components: {
        RecordAudio,
        ImportAudio,
        LoadAudio
    },
    mounted() {
       this.createAnalyser()
    },
    methods: {
        onDelete (event) {
            this.delete(this.idx)
        },
        createAnalyser() {
            var ComponentClass;
            if (this.type === 'Enregistrement') {
                ComponentClass = Vue.extend(RecordAudio)
            } else if (this.type === 'Fichier Audio') {
                ComponentClass = Vue.extend(ImportAudio)
            } else {
                ComponentClass = Vue.extend(LoadAudio)
            }
            var instance = new ComponentClass({propsData: { idx: this.idx}})
            instance.$mount() // pass nothing
            this.$refs.container.appendChild(instance.$el)
        }

    }
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

.card-title {
    margin-top: 10px;
    color: #008991;
    margin-left: 20px;
}

.img-open {
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    height: 32px;
}

</style>