
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
            <div v-if="instanceList.length === 0" class="empty-text">
                Choisissez une des options ci-dessus pour lancer l'expérience
            </div>
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
            window.eventBus.$emit('add-card')

            for (var idxList = 0; idxList < this.instanceList.length; idxList++) {
                this.instanceList[idxList].idx += 1;
            }

            var ComponentClass = Vue.extend(AnalyseInstance)
            var instance = new ComponentClass({
                propsData: { type: typeRequested, idx: 0, delete: this.deleteInstance}
            })
            instance.$mount() // pass nothing
        
            this.$refs.container.insertBefore(instance.$el, this.$refs.container.firstChild);

            //this.$refs.container.appendChild(instance.$el)

            var instanceObject = {}
            instanceObject.idx = 0;//this.instanceList.length
            instanceObject.instance = instance
            this.instanceList.unshift(instanceObject)
        },
        deleteInstance(idx) {

            this.instanceList[idx].instance.$destroy()
            this.$refs.container.removeChild(this.instanceList[idx].instance.$el);
            this.instanceList.splice(idx, 1)

            for (var idxList = 0; idxList < this.instanceList.length; idxList++) {
                if (this.instanceList[idxList].idx > idx) {
                    this.instanceList[idxList].idx -= 1
                }
            }

            window.eventBus.$emit('delete-card', idx)
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


@media screen and (max-width: 600px) {
  .main-divider {
    flex-direction: column;
    align-content: center;
    align-items: center;
  }
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

.empty-text {
    margin-top: 50px;
}
</style>