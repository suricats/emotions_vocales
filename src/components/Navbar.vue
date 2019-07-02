<template>
    <nav class="navbar">
        <div class="navbar-content">
            <router-link to="/" class="logo-container">
                <img  id="logo" src="../../public/logo.png"/>
            </router-link>
        </div>
    </nav>
</template>


<style scoped>

.img {
    border: 0px;
}

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
    justify-content: start;
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
    display: block;
}

.logo-container {
    margin-left: 10%;
    border: 0;
    border: none;
}

</style>