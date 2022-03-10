<template>
  <div>
    <div v-if="dateline" class="dateline"><span class="dateline-text">{{ dateline }}</span></div>
    <div :class="['chat-item', {'my' : isMe}]">
      <div v-if="!isMe" class="profile"><font-awesome-icon icon="user" /></div>
      <div>
        <div v-if="!isMe" class="chat-user">{{ item.user.name }}</div>
        <div class="d-flex">
          <div :class="['chat-message', { 'only-emoji' : isOnlyEmoji }]">{{ item.message }}</div>
          <div class="chat-time">{{ new Date(item.created_at).$getLocaleTimeString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, defineProps, inject } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"

const router = useRouter()
const route = useRoute()

const { getters, dispatch } = useStore()
const getUserId = computed(() => getters['session/getUserId'])

const api = inject('api')
const util = inject('util')
const msg = inject('msg')


const props = defineProps({
  item: {
    type: Object,
  },
  dateline: {
    type: String,
  },
})

const isOnlyEmoji = computed(() => {
  const message = props.item.message
  return util.isEmoji(message) && message.length === 2
})


const isMe = false // props.item.creator_id == getUserId.value

</script>
<style>
.dateline {
  font-size: 12px;
  position: relative;
  text-align: center;
}
.dateline:before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: #F2F6FD;
}
.dateline-text {
  position: relative;
  display: inline-block;
  padding: 0 10px;
  background: #fff;
}
.chat-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}
.chat-item.my {
  float: right;
  justify-content: flex-end;
}
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 1px solid #F2F6FD;
  font-size: 20px;
  margin-right: 10px;
}
.chat-user {
  font-size: 12px;
  margin: 5px 0px;
}
.chat-message {
  background: #F6F6F6;
  border-radius: 5px;
  min-height: 30px;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 5px 10px;
  max-width: 600px;
  overflow-wrap: anywhere;
}
.chat-message.only-emoji {
  background: none;
  font-size: 40px;
  height: 40px;
}
.chat-item.my .chat-message {
  background: #F2F6FD;
}
.chat-time {
  font-size: 10px;
  display: flex;
  align-items: end;
  margin-left: 5px;
}
</style>