<template>
  <div>
    <div v-if="isTitleEdit" class="list-header" v-click-outside="closeTitleEdit" :style="`background:${props.item.color}`">
      <list-header-edit :listId="props.item.list_id" :title="props.item.title" @edit="edit"/>
    </div>
    <div v-else class="list-header" :style="`background:${props.item.color}`">
      <div class="list-title" @click="openTitleEdit">{{ props.item.title }}</div>
      <div class="more-menu-wrap" @click.stop="openMoreMenu" v-click-outside="closeMoreMenu">
        <font-awesome-icon icon="ellipsis-v" class="fs-20" style="color: #fff" />
        <list-header-btn v-if="isOpenMoreMenu" :listId="props.item.list_id" @edit="openTitleEdit"/>
      </div>
    </div>
    <div class="new-card-box">
      <textarea class="new-card" v-model="newCardTitle"/>
      <button :class="['new-card-btn', {'disabled' : !newCardTitle}]" :disabled="!newCardTitle" @click="createCard">{{ t('add.card') }}</button>
    </div>
    <div class="card-list">
      <card v-for="item in props.item.card" :key="`card${item.card_id}`" :item="item"/>
    </div>
    <div></div>
  </div>
</template>
<script setup>
import {getCurrentInstance, ref, defineProps, defineEmits, inject} from "vue"
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import ListHeaderEdit from '@/components/ListHeaderEdit'
import Card from '@/components/Card'
import ListHeaderBtn from '@/components/common/ListHeaderBtn'


const app = getCurrentInstance();
const api = inject('api')
const msg = inject('msg')
const toast = inject('toast')

const emits = defineEmits(['click'])

const props = defineProps({
  item: {
    type: Object,
  },
})

const isTitleEdit = ref(false)
const openTitleEdit = () => {
  isTitleEdit.value = true
  closeMoreMenu()
}
const closeTitleEdit = () => {
  isTitleEdit.value = false
}
const edit = (title) => {
  props.item.title = title
  closeTitleEdit()
}

const isOpenMoreMenu = ref(false)
const openMoreMenu = () => {
  isOpenMoreMenu.value = true
}
const closeMoreMenu = () => {
  isOpenMoreMenu.value = false
}

const remove = async() => {
  const res = await api.deleteList({ listId: props.item.list_id })
  if (res.result) {
    toast(msg['ok.delete']);
    emits('getList')
  }
}

let newCardTitle = ref(null)
const createCard = async() => {
  const res = await api.createCard({
    listId: props.item.list_id,
    title: newCardTitle.value,
  })
  if (res.result) {
    newCardTitle.value = null
    toast(msg['ok.save'])
    emits('getList')
  }
}

const showMoreMenu = () => {
  
}

</script>
<style>
.list {
  margin-top: 20px;
  width: 200px;
  background: #F6F6F6;
  border-radius: 3px;
  display: inline-block;
  margin-right: 5px;
}
.list-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  border-radius: 3px 3px 0px 0px;
  height: 50px;
}
.list-title {
  height: 30px;
  font-size: 14px;
  padding: 3px 0px 0px 10px;
  color: #fff;
  cursor: pointer;
}
.list-remove {
  width: 25px;
  font-size: 3px;
  display: inline-block;
  background: #C90000;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  margin-left: 3px;
  cursor: pointer;
}
.new-card-box {
  margin: 10px 10px 5px 10px;
}
.new-card {
  resize: none;
}
.new-card-btn {
  background: #71C9CE;
  color: #fff;
  width: 100%;
  height: 30px;
  display: block;
}
.card-list {
  width: 185px;
  height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 10px;
}
.more-menu-wrap {
  padding-top: 5px;
  position: relative;
  margin-left: 15px;
  cursor: pointer;
}
.menubars {
  position: absolute;
  left: -50px;
  width: 160px;
  margin-top: 2px;
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #f6f6f6;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 20%) 1px 2px 10px 2px;
  font-size: 12px;
  z-index: 100;
}
.menubars>li {
  padding: 2px 0;
}
.menubars>li:hover {
  background:#F6F6F6;
}

  
</style>