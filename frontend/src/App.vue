<template>
  <div class="app">
    <template v-if="isLogin">
      <loading :isLoading="isLoading"/>

      <global-header/>
      <div id="integrate-wrap" class="layout-container">
        <global-lnb/>
        <div class="layout-contents" :class="{ 'open-lnb' : isOpenLnb }">
          <router-view v-slot="{ Component }" :key="route.name">
            <transition appear name="page-fade" mode="out-in">
              <div>
                <component :is="Component" />
                <card-detail v-if="isOpenCardDetail"/>
              </div>
            </transition>
          </router-view>
        </div>

        <div :class="['toggle-chat-btn']" @click="toggleChat">
          <font-awesome-icon icon="comments" class="fs-20" />
        </div>
        <chat-popup v-if="isOpenChat" @close="toggleChat"/>

        <div :class="['toggle-bot-btn']">
          <font-awesome-icon icon="robot" class="fs-20" />
        </div>
        <!--        <chat-popup v-if="isOpenBot" @close="toggleBot"/>-->
      </div>

    </template>
    <transition appear name="page-fade" mode="out-in" v-else>
<!--      <login />-->
      <router-view v-slot="{ Component }" :key="route.name">
        <transition appear name="page-fade" mode="out-in">
          <div>
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </transition>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex";

import GlobalHeader from '@/components/common/Header.vue'
import GlobalLnb from '@/components/common/Lnb.vue'
import Loading from '@/components/common/Loading'
import Login from '@/views/login.vue'
import CardDetail from '@/components/CardDetail.vue'
import { setMqtt } from '@/plugins/mqtt'
import ChatPopup from "@/components/chat/chatPopup";

const router = useRouter()
const route = useRoute()

const { getters, dispatch } = useStore()
const isLoading = computed(() => getters['common/isLoading'])
const isLogin = computed(() => getters['session/isLogin'])
const getAuthToken = computed(() => getters['session/getAuthToken'])
const getUserId = computed(() => getters['session/getUserId'])
const setSession = (params) => dispatch('session/setSession', params)
const isOpenLnb = computed(() => getters['common/isOpenLnb'])
const toggleLnb = () => dispatch('common/toggleLnb')
const isOpenCardDetail = computed(() => getters['common/isOpenCardDetail'])

const isOpenChat = computed(() => getters['common/isOpenChat'])
const toggleChat = () => dispatch('common/toggleChat')

// const authenicated = (token) => {
//   if (!token) {
//     router.push('/login')
//   }
//   else if (location.pathname === '/') {
//     router.push('/kanban')
//   }
// }

const setJwtInfo = (token) => {
  if (token) {
    const params = {
      authToken: token,
      user_id: localStorage.getItem('user_id'),
      email: localStorage.getItem('email'),
      name: localStorage.getItem('name'),
    }
    setSession(params)
  }
}

console.log(process.env.NODE_ENV === 'development' ? "[개발]" : "[운영]")
const token = localStorage.getItem('authToken');
// authenicated(token)
setJwtInfo(token)

setMqtt()
</script>
<style lang="scss">
@import './assets/scss/_index.scss';
body {
  overflow: hidden;
}
</style>