<template>
  <div id="color-box">
    <span style="display: flex;justify-content: center;">컬럼 색상 지정</span>
    <ul>
      <li v-for="item in list" :key="item" :style="`background:${item.color}`" @click="setColor(item.color)"></li>
    </ul>
  </div>
</template>

<script setup>
  import {getCurrentInstance, ref, defineProps, defineEmits, inject} from "vue"

  const app = getCurrentInstance();
  const api = inject('api')
  const msg = inject('msg')
  const toast = inject('toast')

  const emits = defineEmits(['setColor'])

  const props = defineProps({
    item: {
      type: Object,
    },
  })

  const list = ref(null)
  const getList = async() => {
    const res = await api.getColorList()
    if (res.result) {
      list.value = res.data.list
    }
  }

  const setColor = (color) => {
    emits('setColor', color)
  }

  getList()
</script>

<style scoped>
  #color-box { 
    padding-top: 5px;
    border-radius: 5px; 
    background-color: #fff;
    border-top: 1px dotted #ccc; 
  }
  #color-box ul { 
    display: flex; 
    flex-wrap: wrap; 
    justify-content: space-around;
  }
  #color-box ul li { 
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin: 2px;
  }
</style>