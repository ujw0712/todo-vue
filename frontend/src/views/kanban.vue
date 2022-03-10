<template>
  <div>
    <div class="kanban">
      <draggable v-model="getListList" item-key="order" @change="change" class="kanban-draggable">
        <template #item="{ element }">
          <list class="list" :key="`list${element.list_id}`" :item="element" @getList="getList"/>
        </template>
      </draggable>
      <new-list/>
    </div>
  </div>
</template>

<script setup>
import {computed, getCurrentInstance, inject, ref} from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"
import Draggable from 'vuedraggable'


import List from '@/components/List.vue'
import NewList from '@/components/NewList.vue'

const app = getCurrentInstance();
const api = inject('api')
const util = inject('util')
const msg = inject('msg')

const router = useRouter()
const route = useRoute()

const { getters, dispatch } = useStore()
const getListList = computed(() => getters['kanban/getListList'])
const setListList = (list) => dispatch('kanban/setListList', list)

const list = ref(null)
const getList = async() => {
  const res = await api.getListWithCard()
  if (res.result) {
    list.value = res.data.list
    await setListList(res.data.list)
  }
}

const change = ({ moved }) => {
  console.log("> change - moved : ", moved)
  const listList = getListList.value
  console.log("> list : ", listList)
  const fromList = listList[moved.newIndex]
  console.log("> fromList : ", fromList)
  const toList = listList[moved.oldIndex]
  console.log("> toList : ", toList)

  // listList[moved.newIndex] = toList
  // listList[moved.oldIndex] = fromList
  // setListList(listList)

  const params = {
    fromListId: fromList.list_id,
    toListId: toList.list_id,
  }
  console.log("> params : ", params)

  // api
}

getList()

</script>
<style>
.sortable-chosen {
  opacity: 1 !important;
}
.sortable-ghost {
  opacity: 0 !important;
}
.kanban {
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  white-space:nowrap;
  display: flex;
}
.kanban-draggable {
  display: flex;
}
.list-header-input {
  width: 158px;
  display: inline-block;
  height: 30px;
}
</style>