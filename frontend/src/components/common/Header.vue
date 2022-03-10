<template>
  <div class="layout-header">

    <div class="logo-util">
      <div class="logo color-white cursor-pointer logo-div">
        <span @click="goPage('/kanban')" style="font-size: 24px">TODO</span>
<!--        <span class="toggle-lnb-btn" @click="toggleLnb">-->
<!--          <font-awesome-icon icon="arrow-right-arrow-left" />-->
<!--        </span>-->
      </div>
      <div style="display: flex;width: 180px;justify-content: space-between;">
        <div class="util-menu">
          <div class="userMenu" @click="toggleMenu(true)" v-click-outside="toggleMenu">
            <div style="display: flex;width: 70px;align-items: center;justify-content: space-between">
              <strong class="fs-14">{{ getName }}</strong>
              <div class="user-icon"><font-awesome-icon icon="user" class="fs-18"/></div>
            </div>
            <div v-if="isOpenMenu" class="util-menu-pop">
              <a href="#" @click="logout">{{ t('logout') }}</a>
            </div>
          </div>
        </div>
        <select-box class="w-100" :options="optLang" v-model="lang" @change="setLang"/>
      </div>
    </div>

  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const router = useRouter()
const route = useRoute()

const { getters, dispatch } = useStore()
const isLogin = computed(() => getters['session/isLogin'])
const getAuthToken = computed(() => getters['session/getAuthToken'])
const getUserId = computed(() => getters['session/getUserId'])
const getName = computed(() => getters['session/getName'])
const clearSession = () => dispatch('session/clearSession')
const toggleLnb = () => dispatch('common/toggleLnb')

let isOpenMenu = ref(false)
const toggleMenu = (is) => isOpenMenu.value = (typeof is === 'boolean') ? is :false
const goPage = (url) => router.push(url)

const optLang = [
  { text: '한국어', value: 'ko' },
  { text: '영어', value: 'en' },
]
const lang = ref(locale.value)
const setLang = () => {
  locale.value = lang.value
}

const logout = () => {
  clearSession()
  localStorage.removeItem('authToken')
  localStorage.removeItem('user_id')
  localStorage.removeItem('email')
  localStorage.removeItem('name')
}
</script>
<style>
.logo-div {
  display: flex;
  align-items: center;
}
.toggle-lnb-btn {
  margin-left: 10px;
  font-size: 16px;
}
.user-icon {
  color: #fff;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-radius: 50%;
}
</style>
