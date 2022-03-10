<template>

  <div class="page-title-box">
    <div class="page-title">게시판</div>
    <div>
      <button @click="goList" class="btn btn-outline color-6">목록</button>
      <button v-if="route.params.id" @click="update" class="btn color-1">수정</button>
      <button v-else @click="insert" class="btn color-1">등록</button>
    </div>
  </div>

  <div class="layout-contents-box">
    <div class="contents-box-title">게시판 정보</div>
    <table class="table-cols" ref="table">
      <colgroup>
        <col width="200">
        <col>
      </colgroup>
      <tbody>
      <tr>
        <th class="require">제목</th>
        <td><input type="text" v-model="title" /></td>
      </tr>
      <tr>
        <th class="require">내용</th>
        <td><textarea v-model="content" /></td>
      </tr>
      <tr>
        <th>작성자</th>
        <td></td>
      </tr>
      <tr>
        <th>생성일</th>
        <td></td>
      </tr>
      <tr>
        <th>수정일</th>
        <td></td>
      </tr>
      </tbody>
    </table>
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

let title = ref(null)
let content = ref(null)

const insert = (async () => {
  const res = await api.createBoard({
    title: title.value,
    content: content.value,
  });
  console.log('> insert - res : ', res)
  if (res.result) {

  }
})

const update = (async () => {
  const res = await api.updateBoard({
    title: title.value,
    content: content.value,
  });
  console.log('> update - res : ', res)
  if (res.result) {

  }
})

</script>