<template>
  <div>
    <ul>
      <li v-for="item in 5" style="margin-bottom: 5px;">
        <div>
          <div style="width: 90%;display: inline-block;">
            <input type="text"/>
          </div>
          <span class="list-save">수정</span>
          <span class="list-remove">삭제</span>
        </div>
      </li>
    </ul>
    <div></div>
    <div></div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"
import InputField from "./common/InputField";


const router = useRouter()
const route = useRoute()

const { getters, dispatch } = useStore()


</script>