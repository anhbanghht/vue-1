<template src="./ListDepartment.html"/>

<script>
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import DialogService from '../../../../services/dialog.service';
  import RegistrationService from '../../../../services/registration.service';
  import ShareValueService from '../../../../services/shareValue.service';
  import FaceIcon from "../../../../components/FaceIcon/FaceIcon.vue";
  import MiniProfile from "../../../../components/MiniProfile/MiniProfile.vue";
  import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
  import {Department} from "../../../../models/re/Department";

  export default {
    name: 'ListDepartment',
    components: {
      FaceIcon,
      MiniProfile,
      PageHeader
    },
    data: () => ({
      listDepartment: [],
      userSession: {}
    }),
    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getDepartment();

      ShareValueService.fetchUserSession().then(
        (res) => {
          this.userSession = res;
        }
      ).catch((error) => {
        console.log(error);
      });
    },
    methods: {
      getDepartment() {
        DialogService.setLoaderVisible(true);
        RegistrationService.getListDepartment().then(
          (res) => {
            DialogService.setLoaderVisible(false);
            this.listDepartment = res['data']['departments'];
          }
        ).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        });
      },

      // departmentId: number
      deleteDepartment(departmentId) {
        const model = {
          departmentId: departmentId
        };
        DialogService.setLoaderVisible(true);
        RegistrationService.deleteDepartment(model).then(
          () => {
            DialogService.setLoaderVisible(false);
            DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe(() => {
              this.getDepartment();
            });
          }
        ).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        });
      },

      // department: any
      updateDepartment(department) {
        DialogService.setLoaderVisible(true);
        RegistrationService.updateDepartment(department).then(
          () => {
            DialogService.setLoaderVisible(false);
            DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK'));
          }
        ).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        });
      },

      addDepartment() {
        const department = new Department(null, null, null);
        this.listDepartment.push(department);
      },

      // department: Department
      saveDepartment(department) {
        DialogService.setLoaderVisible(true);
        RegistrationService.saveDepartment(department).then(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK'));
        }).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        })
      },
    }
  }
</script>

<style scoped lang="scss" src="./ListDepartment.scss" />
