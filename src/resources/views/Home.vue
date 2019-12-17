<template>
  <div>
    <h1>Home</h1>

    <VueTimepicker></VueTimepicker>
    <!-- Show seconds picker -->
    <vue-timepicker format="HH:mm:ss"></vue-timepicker>

    <!-- 12-hour format, with AM/PM picker -->
    <vue-timepicker format="hh:mm A"></vue-timepicker>

    <!-- 12-hour format, with seconds picker and am/pm picker -->
    <vue-timepicker format="hh:mm:ss a"></vue-timepicker>

    <div class="row mt-3">
      <div class="col-12 col-md-5">
        <input class="form-control mr-3" v-model="text" />
      </div>
      <div class="col-12 col-md-3">
        <VueTimepicker v-model="time"></VueTimepicker>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12 col-md-5">
        <input class="form-control mr-3" v-model="text" />
      </div>
      <div class="col-12 mx-datepicker-sm col-md-3">
        <DatePicker v-model="date" :clearable="false" type="date"></DatePicker>
      </div>
      <div class="col-12 col-md-3">
        <VueTimepicker v-model="time" :hide-clear-button="true"></VueTimepicker>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12 col-md-5">
        <input class="form-control mr-3" v-model="text" />
      </div>
      <div class="col-12 mx-datepicker-sm col-md-3">
        <DatePicker v-model="date" :clearable="false" type="date" format="YYYY:MM:DD" @close="changeDate"></DatePicker>
      </div>
      <div class="col-12 mx-timepicker-sm col-md-3">
        <DatePicker v-model="time" :clearable="false" type="time" format="HH:mm" :minute-step="5"></DatePicker>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12 col-md-5">
        <input class="form-control mr-3" v-model="text" />
      </div>
      <div class="col-12 mx-datepicker-sm col-md-3">
        <DatePicker v-model="date"></DatePicker>
      </div>
      <div class="col-12 col-md-3">
        <VueTimepicker v-model="time"></VueTimepicker>
      </div>
    </div>
  </div>
</template>

<script>
  import VueTimepicker from 'vue2-timepicker';
  import DatePicker from 'vue2-datepicker';
  import moment from 'moment';

  import LayoutDefault from '../../resources/layouts/LayoutDefault';

  // CSS
  // import 'vue2-timepicker/dist/VueTimepicker.css'import 'vue2-timepicker/dist/VueTimepicker.css'

  export default {
    name: 'Home',
    props: {
      msg: String
    },
    components: {
      VueTimepicker,
      DatePicker
    },
    created() {
      this.$emit('update:layout', LayoutDefault);
    },
    data: () => ({
      text: '',
      date: '',
      time: {
        HH: '10',
        mm: '05'
      },
      dateFormat: {
        // Date to String
        stringify: (date) => {
          return date ? moment(date).format('YYYY-MM-DD') : ''
        },
        // String to Date
        parse: (value) => {
          return value ? moment(value, 'YYYY-MM-DD').toDate() : null
        }
      }
    }),
    methods: {
      changeDate() {
        // Todo
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
