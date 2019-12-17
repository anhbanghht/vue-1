<template src="./MiniProfile.html" />

<script>
  import FaceIcon from '../FaceIcon/FaceIcon.vue'
  import moment from 'moment'

  export default {
    name: 'MiniProfile',
    props: ['userInfo', 'profileOptions'],
    components: {
      FaceIcon
    },
    data: () => ({
      firstName : '',
      lastName: '',
      avatar: '',
      timePost: '',
      mail: '',
      officeName: '',
      jobName: '',
    }),
    created() {
      this.updateInfo();
    },
    beforeUpdate() {
      this.updateInfo();
    },
    methods: {
      updateInfo() {
        if (!this.userInfo) {
          return;
        }
        this.firstName = this.userInfo.firstName;
        this.lastName = this.userInfo.lastName;
        this.avatar = this.userInfo.avatar;
        this.timePost = this.profileOptions.timePost ? moment(this.userInfo.timePost).format('DD-MM-YYYY HH:mm:ss') : '';
        // this.mail = this.profileOptions.mail ? this.userInfo.mail: '';
        // this.officeName = this.profileOptions.officeName ? this.userInfo.officeName: '';
        // this.jobName = this.profileOptions.jobName ? this.userInfo.jobName : '';
      }
    }
  }
</script>

<style scoped lang="scss" src="./MiniProfile.scss"/>
