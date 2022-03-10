<template>
  <div :class="['', {'input-error': !isValidate}, {block: block}]" :style="{width: styleWidth}">
    <select ref="selectbox" v-on="eventListeners" v-model="val" @change="setSelectedIndex" :class="selectBoxClass">
      <option value="" :selected="modelValue == ''" v-if="placeholder">{{placeholder}}</option>
      <option
          :value="v.value"
          :key="'select-' + i"
          v-for="(v, i) in props.options">
        {{v.text}}
      </option>
    </select>

    <p :class="['error-message', {error: errorTransition}]" v-if="!isValidate">
      {{message}}
    </p>
  </div>
</template>
<script setup>
import {ref, watch, computed, onMounted, defineProps, defineEmits, defineExpose } from 'vue'

const props = defineProps({
  modelValue: [String, Number],   // model
  options: {
    type: [Array, Object],
    default: []
  },
  multiple: Boolean,             // 다중 선택. Boolean: false
  placeholder: {
    type: String,
    default: ''
  },
  block: Boolean,               // 행 단위 넓이
  validate: {
    type: Array,
    default: () => []
  },
  errorMessage: {
    type: String,
    default: ''
  },
  width: [String, Number],
  selectBoxClass: {
    type: String,
    default: '',
  }
})
const emit = defineEmits()

let val = ref('')
let isValidate = ref(true)
let message = ref('')
let errorTransition = ref(false)
let selectedIndex = ref(-1)


watch(() => props.errorMessage, (v) => {
  // 임의로 지정된 에러가 있는 경우 에러 아이콘 표기
  if (v != '') {
    isValidate.value = false
    message.value = props.errorMessage.value
  }
})

watch(() => props.errorTransition, (v) => {
  if (v) {
    setTimeout(() => {
      errorTransition.value = false
    }, 300)
  }
})

watch(() => props.modelValue, (v) => {
  val.value = v.toString()
})

watch(() => props.validate, () => {
  message.value = ''
  isValidate.value = true
  errorTransition.value = false
})

const eventListeners = computed(() => {
  return {
    input: evt => {
      updateValue(evt)
    },
  }
})
const styleWidth = computed(() => {
  if (props.width) {
    return (props.width.toString().indexOf('%') >= 0) ? props.width : props.width + 'px'
  } else {
    return false
  }
})

const updateValue = (evt = null) => {
  let v = ''
  if (evt === null) {
    v = props.modelValue
  } else {
    v = evt.target.value
  }

  emit('update:modelValue', v)
}

const selectbox = ref()
const getText = () => {
  return selectbox.options[selectedIndex.value].text
}
const setSelectedIndex = () => {
  selectedIndex.value = selectbox.selectedIndex
}

const check = () => {
  // 임의로 지정된 에러가 없는 경우
  if (props.errorMessage === '') {
    // validate check
    if (props.validate.length > 0) {
      for (let i = 0; i < props.validate.length; i++) {
        let result = props.validate[i].call(null, props.modelValue)

        if (result !== true) {
          message.value = result
          isValidate.value = false
          errorTransition.value = true

          return false
        } else {
          message.value = ''
        }
      }
    }

    message.value = ''
    isValidate.value = true
    return true
  }
}

const resetForm = () => {
  if (props.placeholder == '') {
    props.val = props.options[0].value
  } else {
    props.val = ''
  }

  emit('update:modelValue', '')
}

if (props.modelValue != '') {
  updateValue()
}

defineExpose({
  check,
  resetForm
})

if (props.modelValue !== '') {
  val.value = props.modelValue
} else {
  if (props.placeholder == '') {
    emit('update:modelValue', props.options[0].value)
  }
}
</script>
<style>
.lengthCount {
  margin-right: 5px;
  width: 300px !important;
}
</style>
