<template>
  <div class="list-header-input">
    <input ref="listRef" type="text" v-model="title" @keypress.enter="modify"/>
  </div>
  <div class="list-save" @click="modify"><font-awesome-icon icon="floppy-disk" class="fs-18" /></div>
</template>
<script setup>
import {getCurrentInstance, ref, defineProps, defineEmits, inject} from "vue"

const app = getCurrentInstance();
const api = inject('api')
const msg = inject('msg')
const toast = inject('toast')

const emits = defineEmits(['edit'])

const props = defineProps({
  listId: {
    type: Number
  },
  title: {
    type: String,
    default: '',
  }
})

let listRef = ref()
let title = ref(props.title)
const modify = async() => {
  if (!title.value) {
    toast(msg['required.title'])
    listRef.value.focus()
    return false
  }
  const res = await api.updateList({
    listId: props.listId,
    title: title.value,
  })
  if (res.result) {
    toast(msg['ok.update']);
    emits('edit', title.value)
  }
}
</script>