<template src="./FaceIcon.html" />

<script>
  import {VUE_APP_API_URL_AVATAR} from '../../common/Helper'
  export default {
    name: 'FaceIcon',
    props: ['avatar', 'iconSize'],
    components: {
    },
    data: () => ({
      _defaultPath: '/img/user-no-image.png',
      iconPath: '/img/user-no-image.png',
      firstName: '',
      lastName: '',
      officeName: '',
      jobName: '',
      mail: ''
    }),
    created() {
      console.log(2);
      this.updateFaceIcon();
    },
    beforeUpdate() {
      console.log(1);
      this.updateFaceIcon();
    },
    methods: {
      updateFaceIcon() {
        console.log(this.avatar);
        if (!this.avatar) {
          return;
        }
        this.iconPath = VUE_APP_API_URL_AVATAR + this.avatar;
      }
    }
  }
</script>

<style scoped lang="scss" src="./FaceIcon.scss"/>
