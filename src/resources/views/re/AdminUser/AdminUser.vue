<template src="./AdminUser.html" />

<script>
  import PageHeader from '../../../../components/PageHeader/PageHeader.vue'
  import MiniProfile from '../../../../components/MiniProfile/MiniProfile.vue'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'

  import RegistrationService from '../../../../services/registration.service'
  import DialogService from '../../../../services/dialog.service'

  import {UserStatus} from '../../../../common/RegistrationCommon';
  export default {
    name: 'AdminUser',
    props: {
      msg: String
    },
    components:{
      PageHeader,
      MiniProfile,
      LayoutDefault
    },
    data: () => ({
      UserStatus,
      listDepartment: [],
      listUser: [],
      userSession: {},
      conditionsSearch: {name: '', department: [], status: []}
    }),
    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getDepartments();
      this.searchUser();
    },
    methods: {
      searchUser() {
        let department = this.conditionsSearch.department;
        let status = this.conditionsSearch.status;
        const departmentAll = this.conditionsSearch.department.filter((de) => {
          return de == 'ALL'
        });
        if (departmentAll.length > 0) {
          department = ''
        }

        const statusAll = this.conditionsSearch.status.filter((st) => {
          return st == 'ALL'
        });
        if (statusAll.length > 0) {
          status = ''
        }

        this._conditionsSearch = {
          name: this.conditionsSearch.name,
          department: department,
          status: status
        };

        this.getListUser();
      },

      getListUser() {
        DialogService.setLoaderVisible(true);
        RegistrationService.getListUser(this._conditionsSearch).then((res) => {
          DialogService.setLoaderVisible(false);
          this.listUser = res['data']['users'];
        }).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        })
      },

      getDepartments() {
        RegistrationService.getDepartments().then((res) => {
          this.listDepartment = res['data']['departments'];
        });
      },

      //event: any, userId: number
      deleteUser(event, userId) {
        event.stopPropagation();
        const model = {
          userId: userId
        };

        DialogService.setLoaderVisible(true);
        RegistrationService.deleteUser(model).then(() => {
          DialogService.showSuccess(this.$t('RE.ADMIN_USER.MSG.DELETE_USER_SUCCESS'), this.$t('BTN.OK')).subscribe(
            (res) => {
              if (res.isOk()) {
                this.getListUser();
              }
            }
          )
        }).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        })
      },

      // event: any, userId: number, status: UserStatus
      setUserStatus(event, userId, status) {
        event.stopPropagation();
        const model = {
          userId: userId,
          status: status
        };

        if (status === UserStatus.BLOCK) {
          DialogService.showModal('warning', false, this.$t('RE.ADMIN_USER.BLOCK_USER'), null, null, this.$t('BTN.OK'), this.$t('BTN.CANCEL'), 'ModalCheckBox',
            {checkBox: false, disable: true}, null, null, null).subscribe(
            (res) => {
              if (res.isOk()) {
                this.postUserStatus(model);
              }
            });
        } else {
          this.postUserStatus(model);
        }
      },
      // model: any
      postUserStatus(model) {
        DialogService.setLoaderVisible(true);
        RegistrationService.setUserStatus(model).then(() => {
          DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe(() => {
            this.getListUser();
          });
        }).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        })
      },

      // userId: number
      detailUser(userId) {
        console.log(111111111);
        this.$router.push('/re/userEdit/' + userId);
      }
    }
  }
</script>

<style scoped lang="scss" src="./AdminUser.scss" />
