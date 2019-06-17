
<template>
    <div>
        <h1 class="main-title"> Emotions vocales </h1>
        <h3 class="main-subtitle"> Par CATS </h3>
        <div class="main-divider">
            <div class="router-link">
                <img class="logo" :src="'radio.png'" v-on:click="createInstance('Librairie')"/>
            </div>
            <div class="router-link">
                <img class="logo" :src="'folder.png'" v-on:click="createInstance('Fichier Audio')"/>
            </div>
            <div class="router-link">
                <img class="logo" :src="'micro.png'" v-on:click="createInstance('Enregistrement')"/>
            </div>
        </div>
        <div class="result-container" ref="container">
        </div>
    </div>
</template>


<script>
import AnalyseInstance from '@/components/AnalyseInstance.vue'
import Vue from 'vue'
export default {
    props: ['type'],
    data: function () {
        return {
            instanceList: []
        }
    },
    components: {
        AnalyseInstance
    },
    mounted() {
        this.createInstance(this.$route.query.type)
    },
    methods: {
        createInstance(typeRequested) {

            var ComponentClass = Vue.extend(AnalyseInstance)
            var instance = new ComponentClass({
                propsData: { type: typeRequested, idx: this.instanceList.length, delete: this.deleteInstance}
            })
            instance.$mount() // pass nothing
            this.$refs.container.appendChild(instance.$el)

            var instanceObject = {}
            instanceObject.idx = this.instanceList.length
            instanceObject.instance = instance
            this.instanceList.push(instanceObject)
        },
        deleteInstance(idx) {
            this.instanceList[idx].instance.$destroy()
            this.$refs.container.removeChild(this.instanceList[idx].instance.$el);
            this.instanceList.splice(idx, 1)
        }
    }
}
</script>

<style>


.main-title {
    font-size: 30px;
    margin-top: 30px;
    text-align: center;
    color: #00643e;
}

.main-subtitle {
    width: 60%;
    color: #de1300;
    text-align: right;
}

.main-divider {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-content: center;
}

a {
    text-decoration: none;
    color: #008991;
}

.router-link {
    width: 20%;
    font-weight: bold;
    margin-right: 5%;
    margin-left: 5%;
    font-size: 20px;
    color: #008991;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }

.main-paraph {
    font-size: 15px;
    color: #8190A5;
    margin-top: 20px;
}

.logo {
    width: 128px;
    height: 128px;
}

.result-container {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

}
</style>