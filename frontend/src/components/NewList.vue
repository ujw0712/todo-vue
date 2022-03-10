<template>
  <div class="new-list">
    <div class="new-list-header" style="width: 200px;">
      <div class="list-header-input"><input ref="newListInput" @keypress.enter="add" type="text" v-model="title"/></div>
      <div class="list-save" @click="add"><font-awesome-icon icon="floppy-disk" class="fs-18" /></div>
    </div>
  </div>
</template>
<script setup>
import {ref, defineProps, defineEmits, inject, getCurrentInstance} from "vue"

const app = getCurrentInstance();
const api = inject('api')
const msg = inject('msg')
const toast = inject('toast')

const emits = defineEmits(['click'])

let title = ref(null)
let newListInput = ref()


const add = async() => {
  if (!title.value) {
    toast(msg['required.title'])
    newListInput.value.focus()
    return false
  }
  const res = await api.createList({ title: title.value })
  if (res.result) {
    title.value = null
    toast(msg['ok.save'])
  }
}

</script>
<style>
.new-list {
  margin-top: 20px;
  width: 200px;
  height: 50px;
  background: #F6F6F6;
  border-radius: 3px;
  display: inline-block;
  margin-right: 5px
}
.new-list-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  border-radius: 3px;
}
.list-save {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>