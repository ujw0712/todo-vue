<template>
  <div style="width: 100%;">
    <div class="comment-list">
      <div v-for="item in 40" class="comment-item">댓글내용</div>
    </div>
    <div class="new-comment">
      <div style="width: 90%;display: inline-block;">
        <input type="text"/>
      </div>
      <span class="list-save">등록</span>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"


const router = useRouter()
const route = useRoute()

const { getters, dispatch } = useStore()
const toggleCardDetail = () => dispatch('common/toggleCardDetail')


</script>
<style>
.comment-list {
  height: 500px;
  overflow-y: scroll;
  margin-bottom: 10px;
  font-size: 12px;
  background: #F6F6F6;
  padding: 10px;
  border-radius: 10px;
}
.comment-item {
  margin: 5px 0px;
}
</style>