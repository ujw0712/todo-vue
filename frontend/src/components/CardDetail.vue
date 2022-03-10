<template>
  <div class="popupBox-wrap">
    <div class="popupPosition" @click="toggleCardDetail"></div>
    <div class="popupBox w-1200">
      <div class="popupBox-title center">
        카드이름<span style="font-size: 11px;margin-left: 10px;">2022.01.21</span>
      </div>
      <div class="popupBox-body ta-left card-detail-box">
        <div class="card-info">
          <div class="layout-contents-box">
            <div class="contents-box-title">
              <div>카드 정보</div>
            </div>
            <table class="table-cols">
              <colgroup>
                <col width="100">
                <col width="250">
                <col width="100">
                <col width="250">
              </colgroup>
              <tbody>
              <tr>
                <th>제목</th>
                <td colspan="3"><input type="text"/></td>
              </tr>
              <tr>
                <th>시작일</th>
                <td></td>
                <th>마감일</th>
                <td></td>
              </tr>
              <tr>
                <th>체크리스트</th>
                <td colspan="3">
                  <check-list/>
                </td>
              </tr>
              <tr>
                <th>내용</th>
                <td colspan="3">
                  <textarea style="resize: none;"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-comment">
          <card-comment/>
        </div>
      </div>
      <div class="popupBox-bottom">
        <button class="w-90 btn btn-sm fw-bold color-1">{{ msg['save'] }}</button>
        <button @click="toggleCardDetail" class="w-90 mr-10 btn btn-sm btn-outline color-6">{{ msg['close'] }}</button>
      </div>
    </div>

  </div>
</template>
<script setup>
import {computed, inject, ref} from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"
import CheckList from '@/components/CheckList.vue'
import CardComment from '@/components/CardComment.vue'

const msg = inject('msg')
const router = useRouter()
const route = useRoute()

const { getters, dispatch } = useStore()
const toggleCardDetail = () => dispatch('common/toggleCardDetail')


</script>
<style scoped>
.card-detail-box {
  display: flex;
}
.card-detail-box .layout-contents-box {
  padding: 0;
}
.card-detail-box .table-cols, .card-detail-box tr,
.card-detail-box th, .card-detail-box td{
  border: none;
  background: #fff;
}
.card-info {
  display: flex;
  flex: 2;
}
.card-comment {
  display: flex;
  flex: 1;
}
</style>
