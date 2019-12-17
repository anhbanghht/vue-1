<template src="./ListUser.html"/>

<script>
  import PageHeader from '../../../../components/PageHeader/PageHeader.vue'
  import MiniProfile from '../../../../components/MiniProfile/MiniProfile.vue'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'

  import RegistrationService from '../../../../services/registration.service'
  import DialogService from '../../../../services/dialog.service'
  import ShareValueService from  '../../../../services/shareValue.service'

  export default {
    name: 'ListUser',
    props: {
      msg: String
    },
    components:{
      PageHeader,
      MiniProfile,
      LayoutDefault
    },
    data: () => ({
      listUser: [],
      userSession: {},
      conditionsSearch: {name: '', department: '', status: ''}
    }),
     created() {
      this.$emit('update:layout', LayoutDefault);
      this.getListUser();

      ShareValueService.fetchUserSession().then(
        (res) => {
          this.userSession = res;
        }
      ).catch((error) => {
        console.log(error);
      });
    },
    methods: {
      getListUser() {
        DialogService.setLoaderVisible(true);
        RegistrationService.getListUser(this.conditionsSearch).then(
          (res) => {
            DialogService.setLoaderVisible(false);
            this.listUser = res['data']['users'];
          }
        ).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('RE.ADD_USER.MSG.ADD_USER_FAIL'), this.$t('BTN.OK'));
        })
      },

      // id: number
      deleteUser(id) {
        console.log(id);
      },

      editUser(id) {
        console.log(id);
      },

      showDetailUser(id) {
        console.log(id);
      }
    }
  }
</script>

<style scoped lang="scss" src="./ListUser.scss" />
