<template>
    <div class="login-container">
        <div class="password-container">
            <label for="mdp">Mot de passe</label>
            <input id="mdp-input" class="mdp-input" name="mdp" type="text"/>
        </div>
        <button class="button-validate" v-on:click="SubmitMdp"> Validate </button>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    data: function () {
        return {
        }
    },
    methods: {
        SubmitMdp() {
            const mdp = document.getElementById("mdp-input");;
            if (mdp.value === process.env.VUE_APP_MDP) {
                Cookies.set('logged', true)
                this.$store.commit('login')
            }
        }
    },
}
</script>

<style>
.login-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

}

.mdp-input {
    margin-left: 20px;
    outline: none;
    border: 2px solid #9A9A9A;
    border-radius: 32px;
    padding: 5px 15px;
    background: #fff;
}

.mdp-input:focus {
    box-shadow: 0 0px 5px 0 #888888;
}

.password-container {
    margin-top: 10%;
    display: flex;
    align-items: center;
    flex-direction: row;
}

.button-validate {
    margin-top: 30px;
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

</style>