<template>
    <nav class="navbar">
        <div class="navbar-content">
            <a href="/" id="logo"></a>
            <div class="navbar-fast-link">
                <router-link class="link" to="/record">Mes Emotions</router-link>
                <router-link class="link" to="/library">La Librairie</router-link>
                <router-link class="link" to="/import">Mes Audios</router-link>
            </div>
        </div>
    </nav>
</template>


<style>

.navbar {
    background-color:  #ededed;
    height: 70px;
    display: flex;
    justify-content: center;
}

.navbar-content {
    height: 70px;
    width: 70%;
    display: flex;
    justify-content: center;
}


.navbar-fast-link {
    margin-left: auto;
    align-items: center;
    align-self: center; 
}

.link {
    margin-right: 20px;
    font-size: 15px;
}

#logo {
    margin-left: 10%;
    background-image: url(../../public/logo.png);
    display: block;
    width: 150px;
    height: 150px;
}

</style>