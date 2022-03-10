import { createApp } from 'vue'
import App from '@/App.vue'
import { store } from '@/store'
import { router } from '@/router'
import { i18n } from '@/plugins/i18n'

// utils
import util from '@/utils/util'
import dateUtil from '@/utils/dateUtil'

// toast
import toast from '@/plugins/toast'

// 전역 사용자 정의 디렉티브 v-click-outside 등록
import vClickOutside from "click-outside-vue3"

const app = createApp(App);

// socket io
import io from 'socket.io-client'
const socket = io(process.env.VUE_APP_API_URL)
app.provide('socket', socket)

// 메시지
import message from '@/plugins/message'
app.provide('msg', message)


// axios
import api from '@/api/index'
app.provide('api', new api())



// // toast
// import Toaster from '@meforma/vue-toaster'
// app.provide('toast', Toaster)


//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEllipsisV, faFloppyDisk, faComments, faRobot, faXmark,
  faUser, faPaperPlane, faPlus, faArrowRightArrowLeft, faCalendar,
  faGear, faChartPie, faSquarePollVertical, faBarsProgress
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faEllipsisV, faFloppyDisk, faComments, faRobot, faXmark,
  faUser, faPaperPlane, faPlus, faArrowRightArrowLeft, faCalendar,
  faGear, faChartPie, faSquarePollVertical, faBarsProgress)


app
  // 전역 사용자 정의 디렉티브 v-focus 등록
  .directive('focus', {
    mounted(el) {
      el.focus()
    }
  })

  .use(store)
  .use(router)
  .use(i18n)

  .use(util, {text: 'util'})
  .use(dateUtil, {text: 'dateUtil'})
  .use(toast)


  .use(vClickOutside)


  // 전역 컴포넌트 선언
  .component('InputField', require('@/components/common/InputField.vue').default)
  .component('SelectBox', require('@/components/common/SelectBox.vue').default)
  .component('ValidateForm', require('@/components/common/ValidateForm.vue').default)
  .component('ConfirmPopup', require('@/components/common/ConfirmPopup.vue').default)
  .component('DatePopup', require('@/components/common/DatePopup.vue').default)

  .component('font-awesome-icon', FontAwesomeIcon)

  .mount('#app');

// route v4.x changed (라우터가 많은 경우 로드가 완료 되는 시점에 앱이 활성화 되도록 처리)
// async () => await router.isReady()
