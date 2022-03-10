<template>
  <div class="card" @click="toggleCardDetail">
    <div class="card-title">{{ props.item.title }}</div>
<!--    <div class="card-created">by <strong style="margin-left: 3px;">{{ props.item.user.name }}</strong></div>-->
    <div style="display: flex;justify-content: flex-end;">
      <div class="user-icon color-1"><font-awesome-icon icon="user" class="fs-18"/></div>
    </div>
<!--    <div>{{ dateUtil.initDate(props.item.created_at).$getYYYYMMDD('.') }}</div>-->
  </div>
</template>
<script setup>
import {computed, defineProps, inject, ref} from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"

const dateUtil = inject('dateUtil')

const router = useRouter()
const route = useRoute()

const { getters, dispatch } = useStore()
const toggleCardDetail = () => dispatch('common/toggleCardDetail')

const props = defineProps({
  item: {
    type: Object,
  },
})

</script>
<style lang="scss">
.card {
  height: 100px;
  padding: 10px;
  margin: 10px 0px;
  background: #fff;
  border-radius: 3px;
  font-size: 14px;
  display: flex;
  flex-direction: column;

  .card-title {
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-created {
    display: flex;
    width: 100%;
    justify-content: end;
    font-size: 10px;
  }
}
</style>