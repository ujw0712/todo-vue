<template>
  <div class="popupBox-wrap">
    <div class="popupPosition" @click="close"></div>
    <div v-if="confirmType === 'confirm'" class="popupBox w-600">
      <div class="popupBox-title center">{{ msg['confirm'] }}</div>
      <div class="popupBox-body ta-left" v-html="confirmMessage"></div>
      <div class="popupBox-bottom">
        <button @click.stop="onNoClick" class="w-90 mr-10 btn btn-sm btn-outline color-6">{{ msg['cancel'] }}</button>
        <button @click.stop="onYesClickWrapper" class="w-90 btn btn-sm fw-bold color-1">{{ msg['confirm'] }}</button>
      </div>
    </div>

    <div v-else class="popupBox w-600">
      <div class="popupBox-title center">{{ msg['confirm'] }}</div>
      <div class="popupBox-body ta-left" v-html="confirmMessage"></div>
      <div v-if="onYesClick && onNoClick" class="popupBox-bottom">
        <button @click.stop="onNoClick" class="w-90 mr-10 btn btn-sm btn-outline color-6">{{ msg['cancel'] }}</button>
        <button @click.stop="onYesClickWrapper" class="w-90 btn btn-sm fw-bold color-1">{{ msg['confirm'] }}</button>
      </div>
      <div v-else class="popupBox-bottom">
        <!--          <button @click.stop="onYesClickWrapper" v-focus class="w-90 btn btn-sm fw-bold color-1">{{ msg('confirm') }}</button>-->
        <button @click.stop="onYesClickWrapper" class="w-90 btn btn-sm fw-bold color-1">{{ msg['confirm'] }}</button>
      </div>
    </div>

  </div>
</template>
<script setup>
import { defineProps, ref, inject } from "vue";

const props = defineProps({
  confirmType: {
    type: String,
  },
  onYesClick: {
    type: Function,
  },
  onNoClick: {
    type: Function,
  },
  confirmMessage: {
    type: String,
  },
  confirmTitle: {
    type: String,
  },
})

const msg = inject('msg')

const confirmType = ref(props.confirmType)
const onNoClick = ref(props.onNoClick)
const confirmMessage = ref(props.confirmMessage)
const confirmTitle = ref(props.confirmTitle)

const onYesClickWrapper = (event) => props.onYesClick(event)


</script>