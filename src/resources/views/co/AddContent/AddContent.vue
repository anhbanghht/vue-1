<template src="./AddContent.html" />

<script>
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
  import ImageCropper from "../../../../components/ImageCropper/ImageCropper.vue";

  import {ContentRegister} from "../../../../models/co/ContentRegister";

  import ContentService from '../../../../services/content.service';
  import DialogService from '../../../../services/dialog.service';
  import ShareValueService from '../../../../services/shareValue.service';

  import {PublicContent, TypeImageCropper} from "../../../../common/ContentCommon";
  import {HASH_TAG_REGEX} from '../../../../common/Validator';
  import {VUE_APP_API_URL_IMAGE} from '../../../../common/Helper';

  import moment from 'moment';
  import vSelect from 'vue-select';
  import {VueEditor} from 'vue2-editor';

  export default  {
    name: 'AddContent',
    components: {
      PageHeader,
      VueEditor,
      ImageCropper,
      vSelect
    },
    data: () => ({
      TypeImageCropper,
      PublicContent,
      content: new ContentRegister('', '', PublicContent.PRIVATE, [], '', ''),
      checkValidate: false,
      userSession: {},
      listHashTag: [],
      errorHashTag: false,
      link_image_content: VUE_APP_API_URL_IMAGE
    }),

    created() {
      this.$emit('update:layout', LayoutDefault);
      ShareValueService.fetchUserSession().then(
        (res) => {
          this.userSession = res;
        }
      );
    },
    methods: {
      onSearchHashTag(search, loading) {
        if (!search) {
          this.listHashTag = [];
          return;
        }

        loading(true);
        const model = {
          hashTag: search
        };
        this.listHashTag = [];
        ContentService.getListHashTag(model).then((res) => {
          this.listHashTag = res['data']['hashTag'];
          if (!res['data']['exit']) {
            this.listHashTag.push({hash_tag: search});
          }
          loading(false);
        }).catch(() => {
          loading(false);
        });
      },

      // file: any, Editor: any, cursorLocation: any
      imageAdded(file, Editor, cursorLocation) {
        console.log('dddddddddd');
        const formData = new FormData();
        const fileName = this.userSession['id'] + '_' + moment().format('YYYYMMDDTHHmmssSSS') + '_' + file.name;
        formData.append('image', file, fileName);

        DialogService.setLoaderVisible(true);
        ContentService.uploadImageContent(formData).then(() => {
          DialogService.setLoaderVisible(false);
          Editor.insertEmbed(cursorLocation, 'image', this.link_image_content + fileName);
        }).catch(() => {
          DialogService.setLoaderVisible(false);
        });
      },

      // url: any, Editor: any, cursorLocation: any
      imageRemoved(url) {
        const index = url.lastIndexOf('/');
        const nameImage = url.substr(index + 1);
        DialogService.setLoaderVisible(true);
        ContentService.removeImageContent(nameImage).then(() => {
          DialogService.setLoaderVisible(false);
        }).catch(() => {
          DialogService.setLoaderVisible(false);
        });
      },

      checkValidateContent() {
        this.checkValidate = true;
      },

      postContent(image) {
        this.checkValidate = false;
        const formData = new FormData();

        if (image) {
          const fileName = this.userSession['id'] + '_' + moment().format('YYYYMMDDTHHmmssSSS') + '_' + image.name;
          formData.append('image', image, fileName);
          this.content.image = fileName;
        }

        this.errorHashTag = false;
        for (let i = 0; i < this.content.hash_tag.length; i++) {
          const checkHashTag = HASH_TAG_REGEX.test(this.content.hash_tag[i]['hash_tag']);
          if (!checkHashTag) {
            this.errorHashTag = true;
            break;
          }
        }


        this.$validator.validateAll().then((re) => {
          // check validate success
          if (re && !this.errorHashTag) {
            DialogService.setLoaderVisible(true);
            ContentService.addContent(this.content).then(() => {

              if (this.content.image) {
                ContentService.uploadImageContent(formData).then(() => {
                  DialogService.setLoaderVisible(false);

                  DialogService.showSuccess(this.$t('CO.ADD_CONTENT.MSG.ADD_CONTENT_SUCCESS'), this.$t('BTN.OK')).subscribe(
                    (res) => {
                      if (res.isOk()) {
                        this.$router.push('/co/listContent');
                      }
                    }
                  );
                }).catch(() => {
                  // Todo upload image fail
                  DialogService.setLoaderVisible(false);
                  DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
                });
              } else {
                DialogService.setLoaderVisible(false);
                DialogService.showSuccess(this.$t('CO.ADD_CONTENT.MSG.ADD_CONTENT_SUCCESS'), this.$t('BTN.OK')).subscribe(
                  (res) => {
                    if (res.isOk()) {
                      this.$router.push('/co/listContent');
                    }
                  }
                );
              }
            }).catch(() => {
              DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
              DialogService.setLoaderVisible(false);
            });

          }
        });
      }
    }
  }
</script>

<style lang="scss" src="./AddContent.scss" />
