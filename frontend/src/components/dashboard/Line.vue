<template>
  <div>
    <LineChart v-bind="lineChartProps" />
  </div>
</template>

<script setup>
import {computed, defineProps, getCurrentInstance, inject, ref} from "vue"
import { useRoute, useRouter } from 'vue-router'
import { BarChart, useBarChart, LineChart, useLineChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
Chart.register(...registerables);

const app = getCurrentInstance();
const api = inject('api')
const util = inject('util')
const msg = inject('msg')

const router = useRouter()
const route = useRoute()

const props = defineProps({
  data: {
    type: Object,
  },
})

console.log("> props.data.value : ", props.data.value)

const { lineChartProps } = useLineChart(props.data.value);

</script>