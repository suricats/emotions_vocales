
<template>
    <div class="sparkline-container">
        <canvas id="lineChart" width="100" height="100"></canvas>
        <canvas id="radarChart" width="100" height="100"></canvas>
        <canvas id="doughnutChart" width="100" height="100"></canvas>       

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
            var datas = 
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
            var ctxRadar = document.getElementById('radarChart');

            var total = 0;
            for(var i = 0; i < this.calm.length; i++) {
                total += this.calm[i];
            }
            var averageCalm = total / this.calm.length;

            total = 0;
            for(var i = 0; i < this.anger.length; i++) {
                total += this.anger[i];
            }
            var averageAnger = total / this.anger.length;

            total = 0;
            for(var i = 0; i < this.joy.length; i++) {
                total += this.joy[i];
            }
            var averageJoy = total / this.joy.length;

            total = 0;
            for(var i = 0; i < this.sorrow.length; i++) {
                total += this.sorrow[i];
            }
            var averageSorrow = total / this.sorrow.length;

            console.log("Sorrow " + averageSorrow)

            var myRadarChart = new Chart(ctxRadar, {
                type: 'radar',
                data: {
                    labels: ['Calme', 'Colère', 'Joie', 'Tristesse'],
                    datasets:
                     [{
                        label: 'Moyenne',
                        data: [averageCalm, averageAnger, averageJoy, averageSorrow],
                        backgroundColor: [
                            'rgba(0, 100, 62, 0.2)'
                        ],
                        borderColor: [
                            'rgba(0, 100, 62, 1)'
                        ]
                     }]
                }
            });


            var ctxDoughnut = document.getElementById('doughnutChart');

            new Chart(ctxDoughnut, {
                type: 'doughnut',
                data: {
                    labels: ['Calme', 'Colère', 'Joie', 'Tristesse'],
                    datasets:
                     [{
                        label: 'Moyenne',
                        data: [averageCalm, averageAnger, averageJoy, averageSorrow],
                        backgroundColor: [
                            'rgba(0, 100, 62, 1)',
                            'rgba(222, 0, 19, 1)',
                            'rgba(91, 183, 36, 1)',
                            'rgba(0, 137, 145, 1)'
                        ],
                        borderColor: [
                            'rgba(0, 100, 62, 1)',
                            'rgba(222, 0, 19, 1)',
                            'rgba(91, 183, 36, 1)',
                            'rgba(0, 137, 145, 1)'
                        ]
                     }]
                }
            });
        }
    }
}
</script>

<style>

.sparkline-container {
    width: 600px;
    height: 400px;
}

</style>