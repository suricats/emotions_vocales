
<template>
    <div class="sparkline-container">
        <canvas id="lineChart" width="200" height="200"></canvas>
        <!--<p> Calme </p>
        <li v-for="calmIndex in calm" v-model="calm" >
            {{ calmIndex }}
        </li>

        <p> Colère </p>
        <li v-for="angerIndex in anger">
            {{ angerIndex }}
        </li>

        <p> Joie </p>
        <li v-for="joyIndex in joy">
            {{ joyIndex }}
        </li>

        <p> Tristesse </p>
        <li v-for="sorrowIndex in sorrow">
            {{ sorrowIndex }}
        </li>

        <p> Positivité </p>
        <li v-for="energyIndex in energy">
            {{ energyIndex }}
        </li>-->       
    </div>
</template>


<script>
import Chart from 'chart.js';
export default {
    data: function () {
        return {
            calm : [0],
            anger : [0],
            joy	: [0],
            sorrow : [0],
            energy : [0]
        }
    },
    methods: {
        clean() {
            this.calm = [0],
            this.anger = [0],
            this.joy = [0],
            this.sorrow = [0],
            this.energy = [0]
        },
        initialize(jsonResult) {
            this.calm.push(jsonResult.calm * 2);
            this.anger.push(jsonResult.anger * 2);
            this.joy.push(jsonResult.joy * 2);
            this.sorrow.push(jsonResult.sorrow * 2);
            this.energy.push(jsonResult.energy * 2);

            var label = []
            var idx = 0;
            while (idx < this.calm.length) {
                label.push((idx * 5).toString())
                idx = idx + 1;
            }
            var ctx = document.getElementById('lineChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: label,
                    datasets: [{
                        label: 'calme',
                        data: this.calm,
                        backgroundColor: [
                            'rgba(0, 100, 62, 1)'
                        ],
                        borderColor: [
                            'rgba(0, 100, 62, 1)'
                        ],
                        fill: false
                    }, {
                        label: 'colère',
                        data: this.anger,
                        backgroundColor: [
                            'rgba(222, 0, 19, 1)'
                        ],
                        borderColor: [
                            'rgba(222, 0, 19, 1)'
                        ],
                        fill: false
                    },{
                        label: 'joie',
                        data: this.joy,
                        backgroundColor: [
                            'rgba(91, 183, 36, 1)'
                        ],
                        borderColor: [
                            'rgba(91, 183, 36, 1)'
                        ],
                        fill: false
                    }, {
                        label: 'tristesse',
                        data: this.sorrow,
                        backgroundColor: [
                            'rgba(0, 137, 145, 1)'
                        ],
                        borderColor: [
                            'rgba(0, 137, 145, 1)'
                        ],
                        fill: false
                    }
                ]}
            });
        }
    }
}
</script>

<style>

.sparkline-container {
    width: 70%;
}

</style>