<template>
  <div class="no-layout-container">
    <div class="layout-contents-box">
      <div class="logo mt-50 mb-40 ta-center color-1"><strong style="font-size: 40px;cursor:pointer" @click="goLogin">TODO</strong></div>
      <div class="page-title-box">
        <div class="page-title">회원가입</div>
      </div>

      <validate-form ref="form">
        <div class="contents-box-title ma-20"></div>
        <table class="table-cols">
          <colgroup>
            <col width="220">
            <col>
          </colgroup>
          <tbody>
          <tr>
            <th class="require">이메일</th>
            <td><input-field type="text" class="table-input2" v-model="email" :validate="rule" maxLength="100" /></td>
          </tr>
          <tr>
            <th class="require">이름</th>
            <td><input-field type="text" class="table-input2" v-model="name" :validate="rule" maxLength="40" /></td>
          </tr>
          <tr>
            <th class="require">비밀번호</th>
            <td><input-field type="password" class="table-input2" v-model="password" :validate="rule" maxLength="40" /></td>
          </tr>
          </tbody>
        </table>


        <div class="my-30"><button class="btn btn-x-large color-1 btn-block" @click="join">신청완료</button></div>
      </validate-form>

    </div>
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

const form = ref(null)
const email = ref(null)
const name = ref(null)
const password = ref(null)
const rule = [v => !!v || msg['required.input']]


const join = () => {
  if (!form.value.validate()) {
    return false
  }
  // const res = await api.login({
  //   email: email.value,
  //   password: password.value,
  // });
  // if (res.result) {
  //   // const res = api.join()
  // }
}

const goLogin = () => {
  router.push('/login')
}

</script>
<style>
.no-layout-container {
  width: 50% !important;
  margin-left: 25%;
}
</style>