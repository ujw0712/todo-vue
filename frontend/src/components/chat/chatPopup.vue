<template>
  <transition appear name="chat-slide" @after-leave="emit('close')">
    <div class="chat-popup" v-show="isShowChatPopup">
      <div>
        <div class="close" @click="close"><font-awesome-icon icon="xmark" class="fs-20" /></div>
      </div>
      <div class="chat-wrap">
        <div ref="chatItems" class="chat-items">
          <div v-if="getChatList.length === 0" class="no-chat-data">{{ msg['nodata'] }}</div>
          <chat-item v-else v-for="(item, index) in getChatList" :key="`chat${index}`" :item="item" :dateline="getDate(index)"/>
        </div>
        <chat-input v-if="isShowChatPopup" @add="scrollBottom"/>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, getCurrentInstance, inject, ref, nextTick } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"

import ChatItem from "@/components/chat/ChatItem"
import ChatInput from "@/components/chat/ChatInput"

const app = getCurrentInstance();
const api = inject('api')
const util = inject('util')
const msg = inject('msg')
const socket = inject('socket')

const router = useRouter()
const route = useRoute()

const emit = defineEmits(['close'])

const { getters, dispatch } = useStore()
const getChatList = computed(() => getters['chat/getChatList'])
const setChatList = (list) => dispatch('chat/setChatList', list)


const isShowChatPopup = ref(true)
const close = () => {
  isShowChatPopup.value = false
}

const getList = async() => {
  const res = await api.getChatList()
  if (res.result) {
    await setChatList(res.data.list)
    scrollBottom()
  }
}

socket.on('chat', (data) => {
  const list = getChatList.value
  list.push(data)
  setChatList(list)
})

const getDate = (index) => {
  const prevDate = index > 0 ? new Date(getChatList.value[index-1].created_at).$getLocaleDateString() : null
  const currDate = new Date(getChatList.value[index].created_at).$getLocaleDateString()

  if (prevDate !== currDate) {
    return currDate
  }
  return null
}

const chatItems = ref()
const scrollBottom = (isSmooth) => {
  nextTick(() => {
    const messages = chatItems.value;
    if (isSmooth) {
      messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
    }
    else {
      messages.scrollTo({ top: messages.scrollHeight});
    }
  });
}


getList()

</script>
<style scoped>
.chat-slide-enter-from, .chat-slide-leave-to {transform: translateX(100%)}
.chat-slide-enter-active, .chat-slide-leave-active {transition: transform .3s;}
</style>