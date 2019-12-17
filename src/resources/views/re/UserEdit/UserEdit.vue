<template src="./UserEdit.html" />

<script>
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import DialogService from '../../../../services/dialog.service';
  import RegistrationService from '../../../../services/registration.service';
  import ShareValueService from '../../../../services/shareValue.service';

  import {UserInfo} from "../../../../models/re/UserInfo";
  import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
  import ImageCropper from "../../../../components/ImageCropper/ImageCropper.vue";
  import {TypeImageCropper} from '../../../../common/ContentCommon';
  import {VUE_APP_API_URL_AVATAR} from '../../../../common/Helper';

  import moment from 'moment';
  export default {
    name: 'UserEdit',
    components: {
      PageHeader,
      ImageCropper
    },
    data: () => ({
      TypeImageCropper,
      user: new UserInfo(null, null, null, null, null, null, null),
      listDepartment: [],
      checkValidate: false
    }),
    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getDepartments();
      const userId = this.$route.params['userId'];
      if (userId) {
        this.getDetailUser(userId);
      } else {
        ShareValueService.fetchUserSession().then((res) => {
            this.getDetailUser(res.id);
          }
        );
      }
    },
    methods: {
      getDepartments() {
        RegistrationService.getDepartments().then((res) => {
          this.listDepartment = res['data']['departments'];
        });
      },

      getDetailUser(userId) {
        DialogService.setLoaderVisible(true);
        RegistrationService.getDetailUser(userId).then((res) => {
          DialogService.setLoaderVisible(false);
          this.user = res['data'];
          if (this.user.avatar) {
            this.user.avatar = VUE_APP_API_URL_AVATAR + this.user.avatar;
          }
        }).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        })
      },

      checkValidateUser() {
        this.checkValidate = true;
      },

      saveUser(image) {
        this.checkValidate = false;
        const formData = new FormData();

        if (image) {
          const fileName = this.user.id + '_' + moment().format('YYYYMMDDTHHmmssSSS') + '_' + image.name;
          formData.append('image', image, fileName);
          this.user.avatar = fileName
        } else {
          this.user.avatar = '';
        }

        this.$validator.validateAll().then((re) => {
          // check validate success
          if (re) {
            DialogService.setLoaderVisible(true);
            RegistrationService.updateUser(this.user).then(() => {

              if (this.user.avatar) {
                RegistrationService.uploadUserAvatar(formData).then(() => {
                  DialogService.setLoaderVisible(false);
                  DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe(() => {
                    // this.$router.push('/co/adminContent');
                  });
                }).catch(() => {
                  DialogService.setLoaderVisible(false);
                  DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
                });
              } else {
                DialogService.setLoaderVisible(false);
                DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe(() => {
                  // this.$router.push('/co/adminContent');
                });
              }

            }).catch(() => {
              DialogService.setLoaderVisible(false);
              DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
            });

          }
        });

      }
    }
  }
</script>

<style scoped lang="scss" src="./UserEdit.scss" />
