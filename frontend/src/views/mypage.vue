<template>
  <div>

    <div class="page-title-box">
      <div class="page-title">{{ t('mypage') }}</div>
    </div>

    <div class="layout-contents-box">
      <div class="contents-box-title">
        <div>계정 정보</div>
      </div>
      <table class="table-cols">
        <colgroup>
          <col width="200">
          <col width="400">
          <col>
        </colgroup>
        <tbody>
        <tr>
          <th>이메일</th>
          <td></td>
        </tr>
        <tr>
          <th>이름</th>
          <td></td>
        </tr>
        <tr>
          <th>비밀번호</th>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="information-box">
      <div class="information-box-title">안내</div>
      <div class="information-contents">
        <ul class="dot-list">
          <li>어쩌구 저쩌구</li>
        </ul>
      </div>
    </div>

    <confirm-popup v-if="isOpenPopup" :onYesClick="closePopup" :confirmType="''" :confirmMessage="popupMsg" @close="closePopup" />
  </div>
</template>
<script setup>
import { computed, getCurrentInstance, inject, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex";

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const app = getCurrentInstance();
const api = inject('api')
const util = inject('util')
const msg = inject('msg')

const router = useRouter()
const route = useRoute()

const { getters } = useStore()

const isOpenPopup = ref(false)
const popupMsg = ref(null)

const openPopup = (msg) => {
  popupMsg.value = msg
  isOpenPopup.value = true
}
const closePopup = () => {
  popupMsg.value = null
  isOpenPopup.value = false
  location.href = route.path
}

</script>