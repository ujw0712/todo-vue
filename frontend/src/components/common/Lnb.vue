<template>
  <transition appear name="slide">
    <div class="layout-side" v-show="isOpenLnb">
      <div class="menu-box">
        <ul>
          <li :class="['lnb-li', { on : route.path === '/dashboard' }]" @click="goPage(`/dashboard`)">
            <div class="lnb-li-div">
              <div><font-awesome-icon icon="chart-pie" class="fs-20" /></div>
              {{ t('dashboard') }}
            </div>
          </li>
          <li :class="['lnb-li', { on : route.path === '/kanban' }]" @click="goPage(`/kanban`)">
            <div class="lnb-li-div">
              <div><font-awesome-icon icon="square-poll-vertical" class="fs-20" /></div>
              <div>{{ t('kanban') }}</div>
            </div>
          </li>
          <li :class="['lnb-li', { on : route.path === '/board/list' }]" @click="goPage(`/board/list`)">
            <div class="lnb-li-div">
              <div><font-awesome-icon icon="bars-progress" class="fs-20" /></div>
              {{ t('board') }}
            </div>
          </li>
          <li :class="['lnb-li', { on : route.path === '/mypage' }]" @click="goPage(`/mypage`)">
            <div class="lnb-li-div">
              <div><font-awesome-icon icon="gear" class="fs-20" /></div>
              {{ t('mypage') }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref, computed, defineEmits } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"
import { useI18n } from 'vue-i18n'
const { t }= useI18n()

const emit = defineEmits(['close'])

const router = useRouter()
const route = useRoute()

const { getters } = useStore()
const isOpenLnb = computed(() => getters['common/isOpenLnb'])


const goPage = (page) => router.push(page)

</script>
<style scoped>
.lnb-li {
  width: 120px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.lnb-li-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.slide-enter-from, .slide-leave-to {transform: translateX(-150px)}
.slide-enter-active, .slide-leave-active {transition: transform .2s;}
</style>