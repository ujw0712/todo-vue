<template>
  <div class="page-title-box">
    <div class="page-title">게시판</div>
    <div>
      <button @click="goSave(null)" class="btn color-1">등록</button>
    </div>
  </div>

  <div class="layout-contents-box">
    <div class="contents-box-title">
      <div>검색결과 <strong class="color-1">{{ total }}</strong> 건</div>
    </div>

    <table class="table-rows">
      <thead>
      <tr>
        <th width="50"><input type="checkbox" v-model="allChecked" @change="toggleAll"></th>
        <th>제목</th>
        <th width="150">작성자</th>
        <th width="200">등록일</th>
        <th width="200">수정일</th>
      </tr>
      </thead>
      <tbody v-if="total">
      <tr v-for="item in list" :key="`list-${item.id}`" @click="goSave(item.id)" class="cursor-pointer">
        <td @click.stop><input type="checkbox" class="check-list" :value="item.id" v-model="selectedIds" ></td>
        <td class="left">{{ item.title }}</td>
        <td>{{ item.user.name }}</td>
        <td>{{ item.created_at }}</td>
        <td>{{ item.created_at }}</td>
      </tr>
      </tbody>
      <tbody v-else><tr><td colspan="5">{{ msg['nodata'] }}</td></tr></tbody>
    </table>

    <div class="btn-box flex-between-center my-20">
      <div>
        <button class="btn btn-outline color-7" @click="remove">선택 삭제</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, ref } from "vue"
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const api = inject('api')
const util = inject('util')
const msg = inject('msg')

let list = ref(null)
let total = ref(0)

const getList = async() => {
  const res = await api.getBoardList()
  if (res.result) {
    list.value = res.data.list
    total.value = res.data.list.length
  }
}

const goSave = (id) => {
  if (id) router.push(`/board/${id}`)
  else    router.push(`/board/new`)
}

let allChecked = ref(null)
let selectedIds = ref([])
const remove = async() => {

}

const toggleAll = () => {

}

getList()

</script>