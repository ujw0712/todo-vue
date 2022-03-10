<template>
  <div class="vld-parent">
    <loading :active="isLoading"
             :can-cancel="true"
             :on-cancel="onCancel"
             :is-full-page="true"
             :loader="'spinner'"
             :height="40"
             :width="40"
             :lock-scroll="true"
     />
  </div>
</template>
<script setup>
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import { defineProps , watch, ref } from "vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
  },
})

watch(() => props.isLoading, (v) => {
  setLoading(v)
})

let isLoading = ref(false)
const setLoading = v => {
  isLoading.value = props.isLoading
}

const onCancel = () => {
  console.log('User cancelled the loader.')
  isLoading.value = false;
}
</script>