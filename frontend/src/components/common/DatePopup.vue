<template>
  <div class="calendar_layer">
    <div class="inner_calendar_layer inner_calendar_freeset">
      <div class="layer_head"><strong class="screen_out">날짜 선택 달력</strong></div>
      <div class="layer_body">
        <em class="screen_out">기간 선택</em>
        <ul class="list_period">
          <li :class="{ on : dateBtn === '0' }" @click="clickDateBtn(0)"><a class="link_period">오늘</a></li>
          <li :class="{ on : dateBtn === '-1' }" @click="clickDateBtn(-1)"><a class="link_period">어제</a></li>
          <li :class="{ on : dateBtn === '-7' }" @click="clickDateBtn(-7)"><a class="link_period">최근 7일</a></li>
          <li :class="{ on : dateBtn === '-14' }" @click="clickDateBtn(-14)"><a class="link_period">최근 14일</a></li>
          <li :class="{ on : dateBtn === '-30' }" @click="clickDateBtn(-30)"><a class="link_period">최근 30일</a></li>
          <li :class="{ on : dateBtn === 'thismonth' }" @click="clickDateBtn('thismonth')"><a class="link_period">이번 달</a></li>
          <li :class="{ on : dateBtn === 'lastmonth' }" @click="clickDateBtn('lastmonth')"><a class="link_period">지난 달</a></li>
          <li :class="{ on : dateBtn === 'self' }" @click="clickDateBtn('self')"><a class="link_period">맞춤 설정</a></li>
        </ul>
        <div class="date_calendar">
          <div class="datecalendar_wrap">
            <div class="inner_datecalendar">
              <div class="box_datecalendar">
                <strong class="setinfo_calendar"><span class="txt_setdate">
                      {{ startDate && startDate.$getYYYYMMDD('-') }}
                      <template v-if="endDate">~ {{ endDate && endDate.$getYYYYMMDD('-') }}</template>
                    </span></strong>
                <div class="area_calendar">
                  <em class="tit_date">{{ year1 }}년 {{ month1 }}월</em>
                  <table class="tbl_calendar">
                    <caption class="hide_caption">날짜 선택 달력 표</caption>
                    <colgroup><col><col><col><col><col><col><col></colgroup>
                    <thead>
                    <tr><th scope="col">일</th><th scope="col">월</th><th scope="col">화</th><th scope="col">수</th><th scope="col">목</th><th scope="col">금</th><th scope="col">토</th></tr>
                    </thead>
                    <tbody v-if="dates1.length > 0">
                    <tr v-for="item in dates1">
                      <template v-for="item2 in item">
                        <td v-if="item2 === 0" class="in_active"><span class="link_day"><span class="inner_link_day"></span></span></td>
                        <td v-else @click="setRangeDate(year1, month1-1, item2)"
                            :class="{
                                  'selected_start': startDateNumber === getDate(year1, month1, item2),
                                  'selected_end': endDateNumber === getDate(year1, month1, item2),
                                  'selected': startDateNumber <= getDate(year1, month1, item2) && endDateNumber >= getDate(year1, month1, item2),
                                  'selected_only': startDateNumber === getDate(year1, month1, item2) && endDateNumber === getDate(year1, month1, item2),
                                  'today': today === getDate(year1, month1, item2),
                                  'in_active': today < getDate(year1, month1, item2) || rangeLimit && rangeLimit < new Date(year1, month1-1, item2),
                                  'fst': item2 === 1,
                                  'lst': item2 === new Date(year1, month1, 0).getDate(),
                                }">
                          <span class="link_day"><span class="inner_link_day">{{ item2 }}</span></span>
                        </td>
                      </template>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="area_calendar">
                  <em class="tit_date">{{ year2 }}년 {{ month2 }}월</em>
                  <table class="tbl_calendar">
                    <caption class="hide_caption">날짜 선택 달력 표</caption>
                    <colgroup><col><col><col><col><col><col><col></colgroup>
                    <thead>
                    <tr><th scope="col">일</th><th scope="col">월</th><th scope="col">화</th><th scope="col">수</th><th scope="col">목</th><th scope="col">금</th><th scope="col">토</th></tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in dates2">
                      <template v-for="item2 in item">
                        <td v-if="item2 === 0" class="in_active"><span class="link_day"><span class="inner_link_day"></span></span></td>
                        <td v-else @click="setRangeDate(year2, month2-1, item2)"
                            :class="{
                                    'selected_start': startDateNumber === getDate(year2, month2, item2),
                                    'selected_end': endDateNumber === getDate(year2, month2, item2),
                                    'selected': startDateNumber <= getDate(year2, month2, item2) && endDateNumber >= getDate(year2, month2, item2),
                                    'selected_only': startDateNumber === getDate(year2, month2, item2) && endDateNumber === getDate(year2, month2, item2),
                                    'today': today === getDate(year2, month2, item2),
                                    'in_active': today < getDate(year2, month2, item2) || rangeLimit && rangeLimit < new Date(year2, month2-1, item2),
                                    'fst': item2 === 1,
                                    'lst': item2 === new Date(year2, month2, 0).getDate(),
                                  }">
                          <span class="link_day"><span class="inner_link_day">{{ item2 }}</span></span>
                        </td>
                      </template>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <button type="button" class="btn_move btn_prev" @click="prevCalendar"><span class="ico_comm ico_arr">이전</span></button>
                <button type="button" class="btn_move btn_next" :class="{ 'in_active': isNextBtnAcitve() }" @click="nextCalendar"><span class="ico_comm ico_arr">다음</span></button>
              </div>
            </div>
          </div>
          <div class="btn_wrap">
            <button v-if="startDate && endDate" type="button" class="btn_gm gm_bl" @click="save"><span class="inner_g">저장</span></button>
            <button v-else type="button" class="btn_gm gm_bl in_active"><span class="inner_g">저장</span></button>
            <button class="btn_gm" @click="close"><span class="inner_g">취소</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue"

const props = defineProps({
  startdate: {
    type: Date,
    default: null,
  },
  enddate: {
    type: Date,
    default: null,
  },
  datepreset: {
    type: String,
    default: null,
  },
})

let startDate = ref(props.startdate)
let endDate = ref(props.enddate)
let startDateNumber = ref(props.startdate.$getYYYYMMDDNumber())
let endDateNumber = ref(props.enddate.$getYYYYMMDDNumber())
// let thisDate = new Date();
const today = new Date().$getYYYYMMDDNumber()

let datePreset = props.datepreset

const emit = defineEmits(['save', 'close'])
const save = () => emit('save', startDate.value, endDate.value, datePreset)
const close = () => emit('close')
const getDate = (year, month, day) => Number(`${year}${month}${("0"+day).slice(-2)}`)

const isNextBtnAcitve = () => {
  const date = Number(`${year2.value}${month2.value}`)
  if (new Date().$getYYYYMMNumber() === date) return true
  return false
}

const datePresetToFlag = () => {
  if (props.datepreset === 'TODAY') return '0'
  if (props.datepreset === 'YESTERDAY') return '-1'
  if (props.datepreset === 'LAST_7DAY') return '-7'
  if (props.datepreset === 'LAST_14DAY') return '-14'
  if (props.datepreset === 'LAST_30DAY') return '-30'
  if (props.datepreset === 'THIS_MONTH') return 'thismonth'
  if (props.datepreset === 'LAST_MONTH') return 'lastmonth'
  if (props.datepreset === null) return 'self'
}

let dateBtn = ref(datePresetToFlag())
let year1 = ref(null)
let year2 = ref(null)
let month1 = ref(null)
let month2 = ref(null)
let dates1 = ref([])
let dates2 = ref([])
let rangeLimit = ref(null)

const setRangeDate = (year, month, day) => {
  if (today < getDate(year, month, day)) return false
  if (rangeLimit.value && rangeLimit.value < new Date(year, month, day)) return false
  if (startDateNumber.value && endDateNumber.value) {
    startDateNumber.value = new Date(year, month, day).$getYYYYMMDDNumber()
    startDate.value = new Date(year, month, day)
    endDateNumber.value = null
    endDate.value = null
    rangeLimit.value = new Date(year, month, day).$getDateCalculate(30)
  }
  else if (startDateNumber.value && !endDateNumber.value) {
    if (startDate.value > new Date(year, month, day)) {
      startDateNumber.value = new Date(year, month, day).$getYYYYMMDDNumber()
      startDate.value = new Date(year, month, day)
      rangeLimit.value = new Date(year, month, day).$getDateCalculate(30)
    }
    else {
      endDateNumber.value = new Date(year, month, day).$getYYYYMMDDNumber()
      endDate.value = new Date(year, month, day)
      rangeLimit.value = null
    }
  }
  dateBtn.value = 'self'
  flagToDatePreset('self')
}

const flagToDatePreset = (flag) => {
  if (flag === 0) datePreset = 'TODAY'
  if (flag === -1) datePreset = 'YESTERDAY'
  if (flag === -7) datePreset = 'LAST_7DAY'
  if (flag === -14) datePreset = 'LAST_14DAY'
  if (flag === -30) datePreset = 'LAST_30DAY'
  if (flag === 'thismonth') datePreset = 'THIS_MONTH'
  if (flag === 'lastmonth') datePreset = 'LAST_MONTH'
  if (flag === 'self') datePreset = null
}

let thisDate = endDate.value
const clickDateBtn = (flag) => {
  thisDate = new Date()
  flagToDatePreset(flag)
  nowCalendar()
  if (typeof flag === 'number') {
    startDate.value = new Date().$getDateCalculate(flag)
    startDateNumber.value = new Date().$getDateCalculate(flag).$getYYYYMMDDNumber()
    if (flag === -1) {
      endDate.value = new Date().$getDateCalculate(flag)
      endDateNumber.value = new Date().$getDateCalculate(flag).$getYYYYMMDDNumber()
    }
    else {
      endDate.value = new Date().$getDateCalculate(-1)
      endDateNumber.value = new Date().$getDateCalculate(-1).$getYYYYMMDDNumber()
    }
  }
  else {
    const date = new Date()
    if (flag == 'thismonth') { // 이번달
      startDate.value = new Date(date.getFullYear(), date.getMonth(), 1)
      startDateNumber.value = new Date(date.getFullYear(), date.getMonth(), 1).$getYYYYMMDDNumber()
      endDate.value = new Date()
      endDateNumber.value = new Date().$getYYYYMMDDNumber()
    }
    if (flag == 'lastmonth') { // 지난달
      startDate.value = new Date(date.getFullYear(), date.getMonth()-1, 1)
      startDateNumber.value = new Date(date.getFullYear(), date.getMonth()-1, 1).$getYYYYMMDDNumber()
      endDate.value = new Date(date.getFullYear(), date.getMonth(), 0)
      endDateNumber.value = new Date(date.getFullYear(), date.getMonth(), 0).$getYYYYMMDDNumber()
    }
    if (flag == 'self') {
      startDate.value = new Date()
      startDateNumber.value = new Date().$getYYYYMMDDNumber()
      endDate.value = new Date()
      endDateNumber.value = new Date().$getYYYYMMDDNumber()
    }
  }
  dateBtn.value = flag
}

const nowCalendar = () => {
  rangeLimit.value = null
  const calendar1 = buildCalendar(new Date(thisDate.getFullYear(), thisDate.getMonth()-1, thisDate.getDate()))
  year1.value = calendar1.year
  month1.value = calendar1.month
  dates1.value = calendar1.dates
  const calendar2 = buildCalendar(thisDate)
  year2.value = calendar2.year
  month2.value = calendar2.month
  dates2.value = calendar2.dates
}

const prevCalendar = () => {
  const calendar1 = buildCalendar(new Date(thisDate.getFullYear(), thisDate.getMonth()-2, thisDate.getDate()))
  year1.value = calendar1.year
  month1.value = calendar1.month
  dates1.value = calendar1.dates
  const calendar2 = buildCalendar(new Date(thisDate.getFullYear(), thisDate.getMonth()-1, thisDate.getDate()))
  year2.value = calendar2.year
  month2.value = calendar2.month
  dates2.value = calendar2.dates
  thisDate = new Date(thisDate.getFullYear(), thisDate.getMonth()-1, thisDate.getDate())
}

const nextCalendar = () => {
  if (isNextBtnAcitve()) return false
  const calendar1 = buildCalendar(new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate()))
  year1.value = calendar1.year
  month1.value = calendar1.month
  dates1.value = calendar1.dates
  const calendar2 = buildCalendar(new Date(thisDate.getFullYear(), thisDate.getMonth()+1, thisDate.getDate()))
  year2.value = calendar2.year
  month2.value = calendar2.month
  dates2.value = calendar2.dates
  thisDate = new Date(thisDate.getFullYear(), thisDate.getMonth()+1, thisDate.getDate())
}

const buildCalendar = (date) => {
  const sliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }
  let year = date.getFullYear();
  let month = date.getMonth();
  let firstDay = new Date(year,month,1).getDay();
  let lastDate = new Date(year,month+1,0).getDate();
  if ((year%4===0 && year % 100 !==0) || year%400===0) lastDate[1]=29;
  let dates = []
  for (let i=0; i<firstDay; i++) dates.push(0)
  for (let i=1; i <=lastDate; i++) dates.push(i)
  if (dates.length % 7 !== 0) for(let i = 1; i <= dates.length % 7; i++) dates.push(0)
  return {
    year: year,
    month: ("0" + (month+1)).slice(-2),
    dates: sliceIntoChunks(dates, 7),
  }
}

nowCalendar()

</script>