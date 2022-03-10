<template>
  <div class="login-layout">
    <div class="w-360">
      <div class="logo mb-20 ta-center color-1 fs-34"><strong>TODO</strong></div>

      <validate-form ref="form">
        <div>
          <input-field type="text" v-model="email" :validate="rule" placeholder="아이디" maxLength="100" />
        </div>
        <div class="mt-10">
          <input-field type="password" v-model="password" :validate="rule" placeholder="비밀번호" maxLength="20" />
        </div>
        <div class="mt-15">
          <button class="btn btn-x-large color-1 btn-block" @click="login">로그인</button>
        </div>
        <div class="mt-5" @click="goPage('/join')">
          <button class="btn btn-x-large color-1 btn-block">회원가입</button>
        </div>
      </validate-form>
    </div>

    <confirm-popup v-if="isOpenPopup" :onYesClick="closePopup" :confirmType="''" :confirmMessage="popupMsg" @close="closePopup" />
  </div>
</template>
<script setup>
import { inject, ref } from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()

const api = inject('api')
const util = inject('util')
const msg = inject('msg')
const rule = [v => !!v || msg['required.input']]
const form = ref(null)
const email = ref("ujwtest12@gmail.com")
const password = ref("wldnjsdl3!")
const isOpenPopup = ref(false)
const popupMsg = ref(null)

const openPopup = (msg) => {
  popupMsg.value = msg
  isOpenPopup.value = true
}
const closePopup = () => {
  popupMsg.value = null
  isOpenPopup.value = false
}

const login = (async () => {
  if (!form.value.validate()) {
    return false
  }
  const res = await api.login({
    email: email.value,
    password: password.value,
  });
  if (res.result) {
    const info = util.parseJwt(res.data.token)
    if (info) {
      localStorage.setItem('authToken', res.data.token)
      localStorage.setItem('user_id', info.user_id)
      localStorage.setItem('email', info.email)
      localStorage.setItem('name', info.name)
      localStorage.setItem('isKakao', info.is_kakao)
      localStorage.setItem('kakaoAccountId', info.kakao_account_id)
    }
    location.href = '/kanban'
  }
  else {
    openPopup(`${msg['fail']} (code: ${res.code})`)
  }
})

const goPage = (url) => {
  router.push(url)
}
</script>