<template>
  <ul class="menubars">
      <li class="ml-5" @click.stop="editTitle">수정</li>
      <li class="ml-5" @click="remove">삭제</li>
      <li><change-color @setColor="setColor"/></li>
  </ul>
</template>

<script setup>
import {getCurrentInstance, ref, defineProps, defineEmits, inject} from "vue"
import ChangeColor from '@/components/common/ChangeColor'

const app = getCurrentInstance();
const api = inject('api')
const msg = inject('msg')
const toast = inject('toast')

const emits = defineEmits(['editTitle'])


const editTitle = () => {
  emits('edit')
}

const props = defineProps({
  listId: {
    type: Number,
  },
})
 
const isTitleEdit = ref(false)
const openTitleEdit = () => {
  isTitleEdit.value = true
}
const closeTitleEdit = () => {
  isTitleEdit.value = false
}
const edit = (title) => {
  props.item.title = title
  closeTitleEdit()
}

const remove = async() => {
  const res = await api.deleteList({ listId: props.listId })
  if (res.result) {
    toast(msg['ok.delete']);
    emits('getList')
  }
}

const setColor = async(color) => {
    console.log("> color : ", color)
  console.log(". props.item.list_id : ", props.listId)
  const res = await api.updateList({
    listId: props.listId,
    color: color,
  })
  console.log(" res : ", res)
}
</script>

<style scoped>
  
</style>