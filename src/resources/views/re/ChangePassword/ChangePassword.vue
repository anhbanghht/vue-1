<template src="./ChangePassword.html" />

<script>
  import PageHeader from '../../../../components/PageHeader/PageHeader.vue'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'

  import RegistrationService from '../../../../services/registration.service'
  import DialogService from '../../../../services/dialog.service'
  export default {
    name: 'ChangePassword',
    props: {
      msg: String
    },
    components:{
      PageHeader
    },
    data: () => ({
      password: '',
      passwordConfirm: ''
    }),
    created() {
      this.$emit('update:layout', LayoutDefault);
    },
    methods: {
      changePassword() {

        this.$validator.validateAll().then((result) => {
          if (result) {
            DialogService.setLoaderVisible(true);
            RegistrationService.changePassword(this.password, this.passwordConfirm).then(
              () => {
                DialogService.setLoaderVisible(false);
                DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK'));
              }
            ).catch(() => {
              DialogService.setLoaderVisible(false);
              DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
            });
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss" src="./ChangePassword.scss" />
