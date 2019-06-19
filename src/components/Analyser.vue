
<template>
    <div class="sparkline-container">
        <div class="line-chart" ref="linecontainer">
        </div>
        <div class="doughnut-chart" ref="doughnutcontainer">
        </div>
    </div>
</template>


<script>
import Chart from 'chart.js';
export default {
    props: ['idx'],
    data: function () {
        return {
            calm : [0],
            anger : [0],
            joy	: [0],
            sorrow : [0],
            energy : [0]
        }
    },
    mounted() {
        this.createCanvas()
    },
    created() {
        window.eventBus.$on('add-card', value => {
            this.idx += 1
        }),
        window.eventBus.$on('delete-card', value => {
            if (value < this.idx) {
                this.idx -= 1
            }
        })
    },
    methods: {
        clean() {
            this.calm = [0]
            this.anger = [0]
            this.joy = [0]
            this.sorrow = [0]
            this.energy = [0]

            var line = document.getElementById('lineChart'+this.idx);
            while (line.firstChild) {
                line.removeChild(line.firstChild);
            }

            var doughnut = document.getElementById('doughnutChart'+this.idx);
            while (doughnut.firstChild) {
                doughnut.removeChild(doughnut.firstChild);
            }

        },
        createCanvas() {
            var canvas = document.createElement("canvas");
            canvas.width = '400';
            canvas.height = '200';
            canvas.id = 'lineChart'+ this.idx
            this.$refs.linecontainer.appendChild(canvas);

            var canvasDoughnut = document.createElement("canvas");
            canvasDoughnut.width = '200';
            canvasDoughnut.height = '200';
            canvasDoughnut.id = 'doughnutChart'+this.idx
            this.$refs.doughnutcontainer.appendChild(canvasDoughnut);

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
                label.push((idx * 3).toString())
                idx = idx + 1;
            }
            var ctx = document.getElementById('lineChart'+this.idx);


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

            var ctxDoughnut = document.getElementById('doughnutChart'+this.idx);

            new Chart(ctxDoughnut, {
                type: 'doughnut',
                data: {
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
    width: 700px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

}

.line-chart {
    width: 400px;
    height: 200px;
}

.doughnut-chart {
    width: 200px;
    height: 200px;
}

</style>