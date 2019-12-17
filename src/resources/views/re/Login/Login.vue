<template src="./Login.html"></template>

<script>
  import RegistrationService from '../../../../services/registration.service'
  import DialogService from '../../../../services/dialog.service'
  import ShareValueService from  '../../../../services/shareValue.service'

  import LayoutDefaultMain from '../../../../resources/layouts/LayoutDefaultMain.vue'

  export default {
    name: 'Login',
    props: {
      msg: String
    },
    data: () => ({
      email: '',
      password: ''
    }),
    created() {
      this.$emit('update:layout', LayoutDefaultMain);
    },
    methods: {
      login() {
        // this.$validator.validateAll().then((result) => {
        //   if (result) {
            DialogService.setLoaderVisible(true);

            RegistrationService.login(this.email, this.password).then((res) => {
              console.log(res);
              DialogService.setLoaderVisible(false);
              ShareValueService.setAccessToken(res['data']['access_token']);
              ShareValueService.fetchUserSession().then();
              this.$router.push('/re/listUser');
            }).catch((error) => {
              console.log(error);
              DialogService.setLoaderVisible(false);
              DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
            });
          // }
        // });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Login.scss">
</style>
