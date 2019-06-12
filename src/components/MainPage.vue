
<template>
    <div>
        <h1 class="main-title"> Emotions vocales </h1>
        <h3 class="main-subtitle"> Par CATS </h3>
        <div class="main-divider">
            <div class="router-link">
                <img class="logo" :src="'radio.png'"/>
                <router-link to="/library">Choisissez parmis nos exemples de fichiers audio</router-link>
                <p class="main-paraph">
                    Au contraire vous n'avez pas d'inspriration ou vous doutez de vos talents d'acteur  ? Ne vous inquètez pas Nous avons sélectionné différents extraits pour que vous puissiez tester la reconnaissance d'émotions vocales.
                </p>
            </div>
            <div class="router-link">
                <img class="logo" :src="'folder.png'"/>
                <router-link to="/import">Téléchargez vos fichiers audio</router-link>
                <p class="main-paraph">
                    Vous avez une idée derrère la tête ? Vous pouvez utiliser les fichiers audio de votre choix pour tenter l'experience et annalyser les émotions tout au long de l'extrait.
                </p>
            </div>
            <div class="router-link">
                <img class="logo" :src="'micro.png'"/>
                <router-link to="/record">Enregistrez vous et testez vos émotions</router-link>
                <p class="main-paraph">
                    Envie de tester vos talents d'acteur ? Enregistrez vous et constatez en direct  l'évolution de vos émotions !
                </p>
            </div>

        </div>
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            
        }
    },
    methods: {

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
    align-content: flex-start;
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
</style>