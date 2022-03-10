<template>
  <div class="chat-input-div">
    <div class="chat-input">
      <dib>
        <textarea ref="chatMessage" class="chat-textarea" rows="1" v-model="message" placeholder="메시지 보내기" @keydown.stop="keydown($event)"/>
      </dib>
      <div class="chat-btn-div">
        <div class="more-btn-div">
          <div><font-awesome-icon icon="plus" /></div>
          <div class="chat-emoji-div" @click="openEmoji" v-click-outside="closeEmoji">
            <VuemojiPicker v-if="isOpenEmoji" :locale="'kr'" @emojiClick="addEmoji" class="chat-emoji" />
          </div>
        </div>
        <div :class="['chat-save-btn', { 'active' : message }]" @click="send"><font-awesome-icon icon="paper-plane" /></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, getCurrentInstance, inject, ref, nextTick, defineEmits} from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker'

const emits = defineEmits(['add'])

const app = getCurrentInstance();
const api = inject('api')
const util = inject('util')
const msg = inject('msg')
const socket = inject('socket')

const router = useRouter()
const route = useRoute()

const { getters, dispatch } = useStore()
const getUserId = computed(() => getters['session/getUserId'])
const getName = computed(() => getters['session/getName'])

let message = ref('')
const send = async() => {
  if (message.value.length === 0) {
    return false
  }
  const res = await api.createChat({ message: message.value })
  if (res.result) {
    socket.emit('chat', {
      ...res.data,
      created_at: new Date(),
      user: {
        user_id: res.data.creator_id,
        name: getName.value,
      },
    })
    message.value = ''
  }
}

let isOpenEmoji = ref(false)
const openEmoji = () => isOpenEmoji.value = true
const closeEmoji = () => isOpenEmoji.value = false

const chatMessage = ref()
const addEmoji = ({unicode}) => {
  const textarea = chatMessage.value
  const cursorPosition = textarea.selectionEnd
  const start = message.value.substring(0, textarea.selectionStart)
  const end = message.value.substring(textarea.selectionStart)
  const text = start + unicode + end
  message.value = text;
  textarea.focus()
  nextTick(() => {
    textarea.selectionEnd = cursorPosition + unicode.length
  })
}

const keydown = (event) => {
  if (!event) return false
  if ( event.keyCode === 13 && !event.shiftKey ) {
    event.preventDefault()
    if (event.isComposing) return false
    setTimeout(() => emits('add', true), 500)
    send()
    return false
  }
}

</script>
<style>
.chat-input-div {
  position: fixed;
  bottom: 5%;
  width: 742px; /*calc(100% - 260px);*/
  /*padding-bottom: 2%;*/
  height: 10vh;
  background: #fff;
}
.chat-input {
  border: 2px solid #326edc;
  border: 2px solid #b9b9b9;
  border-radius: 5px;
  padding: 5px;
}
.chat-textarea {
  resize: none;
  border: none !important;
}
.chat-btn-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #F2F6FD;
  padding: 5px 5px 0px 5px;
  height: 30px;
}
.chat-emoji-div {
  width: 20px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.chat-emoji-div:before {
  content: '😀';
  /*content: '☺';*/
}
.chat-emoji-div:hover:before {
  /*content: '😆';*/
  content: '🤪';
}

.chat-emoji {
  position: absolute;
  bottom: 80px;
}
.chat-save-btn {
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b9b9b9;
  cursor: pointer;
}
.chat-save-btn.active {
  /*color: #326edc;*/
}
.more-btn-div {
  display: flex;
}
.more-btn-div > div {
  margin-left: 10px;
}
</style>