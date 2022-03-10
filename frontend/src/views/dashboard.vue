<template>
  <div>
    <div class="layout-contents-box">
      <div class="contents-box-title">
        <div>선그래프</div>
      </div>
      <div>
        <LineChart v-bind="lineChartData" />
      </div>
    </div>
    <div class="layout-contents-box">
      <div class="contents-box-title">
        <div>세로막대그래프</div>
      </div>
      <div>
        <BarChart v-bind="barChartData" />
      </div>
    </div>
    <div class="layout-contents-box">
      <div class="contents-box-title">
        <div>도넛그래프</div>
      </div>
      <div>
        <DoughnutChart v-bind="doughnutChartData" />
      </div>
    </div>
    <div class="layout-contents-box">
      <div class="contents-box-title">
        <div>파이그래프</div>
      </div>
      <div>
        <PieChart v-bind="pieChartChartData" />
      </div>
    </div>
    <div class="layout-contents-box">
      <div class="contents-box-title">
        <div>PolarAreaChart</div>
      </div>
      <div>
        <PolarAreaChart v-bind="polarAreaChartData" />
      </div>
    </div>
    <div class="layout-contents-box">
      <div class="contents-box-title">
        <div>RadarChart</div>
      </div>
      <div>
        <RadarChart v-bind="radarChartData" />
      </div>
    </div>
    <div class="layout-contents-box">
      <div class="contents-box-title">
        <div>BubbleChart</div>
      </div>
      <div>
        <BubbleChart v-bind="bubbleChartData" />
      </div>
    </div>
    <div class="layout-contents-box">
      <div class="contents-box-title">
        <div>ScatterChart</div>
      </div>
      <div>
        <ScatterChart v-bind="scatterChartData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, getCurrentInstance, inject, ref} from "vue"
import { useRoute, useRouter } from 'vue-router'
import { BarChart, useBarChart, LineChart, useLineChart, DoughnutChart, useDoughnutChart, PieChart, usePieChart,
  PolarAreaChart, usePolarAreaChart, RadarChart, useRadarChart, BubbleChart, useBubbleChart, ScatterChart, useScatterChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
Chart.register(...registerables);

const app = getCurrentInstance();
const api = inject('api')
const util = inject('util')
const msg = inject('msg')

const router = useRouter()
const route = useRoute()

const lineChartData = ref(null)
const data1 = ref(null)
const setData1 = () => {
  const options = computed(() => ({
    plugins: {
      legend: {
        display: false,
      },
    },
  }));
  data1.value = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Bitcoin",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#4bc0c0",
      },
      {
        label: "Ethereum",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "#565656",
      },
    ],
  }
  lineChartData.value = useLineChart({
    options,
    chartData: data1.value
  }).lineChartProps.value
}



const barChartData = ref(null)
const data2 = ref(null)
const setData2 = () => {
  const options = computed(() => ({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }));

  data2.value = {
    labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
    datasets: [
      {
        data: [30, 40, 60, 70, 5],
        backgroundColor: [
          "#77CEFF",
          "#0079AF",
          "#123E6B",
          "#97B0C4",
          "#A5C8ED",
        ],
      },
    ],
  }
  barChartData.value = useBarChart({
    options,
    chartData: data2.value,
  }).barChartProps.value
}

const doughnutChartData = ref(null)
const data3 = ref(null)
const setData3 = () => {
  const options = computed(() => ({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }));

  data3.value = {
    labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
    datasets: [
      {
        data: [30, 40, 60, 70, 5],
        backgroundColor: [
          "#77CEFF",
          "#0079AF",
          "#123E6B",
          "#97B0C4",
          "#A5C8ED",
        ],
      },
    ],
  }
  doughnutChartData.value = useDoughnutChart({
    options,
    chartData: data3.value,
  }).doughnutChartProps.value
}

const pieChartChartData = ref(null)
const data4 = ref(null)
const setData4 = () => {
  const options = computed(() => ({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }));

  data4.value = {
    labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
    datasets: [
      {
        data: [30, 40, 60, 70, 5],
        backgroundColor: [
          "#77CEFF",
          "#0079AF",
          "#123E6B",
          "#97B0C4",
          "#A5C8ED",
        ],
      },
    ],
  }
  pieChartChartData.value = usePieChart({
    options,
    chartData: data4.value,
  }).pieChartProps.value
}

const polarAreaChartData = ref(null)
const data5 = ref(null)
const setData5 = () => {
  const options = computed(() => ({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }));

  data5.value = {
    labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
    datasets: [
      {
        data: [30, 40, 60, 70, 5],
        backgroundColor: [
          "#77CEFF",
          "#0079AF",
          "#123E6B",
          "#97B0C4",
          "#A5C8ED",
        ],
      },
    ],
  }
  polarAreaChartData.value = usePolarAreaChart({
    options,
    chartData: data5.value,
  }).polarAreaChartProps.value
}

const radarChartData = ref(null)
const data6 = ref(null)
const setData6 = () => {
  const options = computed(() => ({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }));

  data6.value = {
    labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
    datasets: [
      {
        data: [30, 40, 60, 70, 5],
        backgroundColor: [
          "#77CEFF",
          "#0079AF",
          "#123E6B",
          "#97B0C4",
          "#A5C8ED",
        ],
      },
    ],
  }
  radarChartData.value = useRadarChart({
    options,
    chartData: data6.value,
  }).radarChartProps.value
}

const bubbleChartData = ref(null)
const data7 = ref(null)
const setData7 = () => {
  const options = computed(() => ({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }));

  data7.value = {
    labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
    datasets: [
      {
        data: [30, 40, 60, 70, 5],
        backgroundColor: [
          "#77CEFF",
          "#0079AF",
          "#123E6B",
          "#97B0C4",
          "#A5C8ED",
        ],
      },
    ],
  }
  bubbleChartData.value = useBubbleChart({
    options,
    chartData: data7.value,
  }).bubbleChartProps.value
}

const scatterChartData = ref(null)
const data8 = ref(null)
const setData8 = () => {
  const options = computed(() => ({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }));

  data8.value = {
    labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
    datasets: [
      {
        data: [30, 40, 60, 70, 5],
        backgroundColor: [
          "#77CEFF",
          "#0079AF",
          "#123E6B",
          "#97B0C4",
          "#A5C8ED",
        ],
      },
    ],
  }
  scatterChartData.value = useScatterChart({
    options,
    chartData: data8.value,
  }).scatterChartProps.value
}


setData1()
setData2()
setData3()
setData4()
setData5()
setData6()
setData7()
setData8()
</script>