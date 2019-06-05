
<template>
    <div>
        <p>Calme : {{this.calm}}</p>
        <p>Colère : {{this.anger}}</p>
        <p>Joie : {{this.joy}}</p>
        <p>Tristesse : {{this.sorrow}}</p>
        <br/>
        <p>Positivité : {{this.energy}}</p>        
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            calm : 0,
            anger : 0,
            joy	: 0,
            sorrow : 0,
            energy : 0
        }
    },
    methods: {
        initialize(jsonResult) {
            this.calm = jsonResult.calm * 2;
            this.anger = jsonResult.anger * 2;
            this.joy = jsonResult.joy * 2;
            this.sorrow = jsonResult.sorrow * 2;
            this.energy = jsonResult.energy * 2;
        }
    }
}
</script>

<style>



</style>