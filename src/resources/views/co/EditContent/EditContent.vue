<template src="./EditContent.html" />

<script>
  // component
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
  import ImageCropper from "../../../../components/ImageCropper/ImageCropper.vue";
  import { VUE_APP_API_URL_IMAGE } from '../../../../common/Helper';

  // service
  import ContentService from '../../../../services/content.service';
  import DialogService from '../../../../services/dialog.service';
  import ShareValueService from '../../../../services/shareValue.service';

  // model
  import {Content} from "../../../../models/co/Content";
  import {PublicContent, TypeImageCropper} from '../../../../common/ContentCommon';
  import {Validator} from '../../../../common/Validator';

  // script
  import moment from 'moment';
  import {VueEditor} from "vue2-editor";
  import vSelect from 'vue-select';

  export default {
    name: 'EditContent',
    components: {
      PageHeader,
      VueEditor,
      ImageCropper,
      vSelect
    },
    data: () => ({
      TypeImageCropper,
      PublicContent,
      contentId: '',
      link_image_content: VUE_APP_API_URL_IMAGE,
      content: new Content(null, null, null, PublicContent.PRIVATE, [], null, null, null, null, null),
      checkValidate: false,
      userSession: {},
      errorHashTag: false,
      listHashTag: [],
    }),

    created() {
      this.$emit('update:layout', LayoutDefault);
      this.contentId = this.$route.params['contentId'];

      if (this.contentId) {
        this.getDetailContent();
      }

      ShareValueService.fetchUserSession().then(
        (res) => {
          this.userSession = res;
        }
      );
    },

    methods: {
      getDetailContent() {
        DialogService.setLoaderVisible(true);
        ContentService.getDetailContent(this.contentId).then((res) => {
          DialogService.setLoaderVisible(false);
          this.content = res['data']['content'];
          this.content.image = this.content.image ? this.link_image_content + this.content.image : '';
        }).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        });
      },

      onSearchHashTag(search, loading) {
        if (!search) {
          this.listHashTag = [];
          return;
        }

        loading(true);
        const model = {
          hashTag: search
        };
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

      setSelected(value) {
        this.content.hash_tag = value;
      },

      // file: any, Editor: any, cursorLocation: any
      imageAdded(file, Editor, cursorLocation) {
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

      saveContent(image) {
        this.checkValidate = false;
        const formData = new FormData();

        if (image) {
          const fileName = this.content.user_created + '_' + moment().format('YYYYMMDDTHHmmssSSS') + '_' + image.name;
          formData.append('image', image, fileName);
          this.content.image = fileName
        } else {
          this.content.image = '';
        }

        this.errorHashTag = false;
        for (let i = 0; i < this.content.hash_tag.length; i++) {
          const checkHashTag = Validator.hashTagRegex.test(this.content.hash_tag[i]['hash_tag']);
          if (!checkHashTag) {
            this.errorHashTag = true;
            break;
          }
        }

        this.$validator.validateAll().then((re) => {
          // check validate success
          if (re && !this.errorHashTag) {
            DialogService.setLoaderVisible(true);
            ContentService.editContent(this.content).then(() => {

              if (this.content.image) {
                ContentService.uploadImageContent(formData).then(() => {
                  DialogService.setLoaderVisible(false);
                  DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe(() => {
                    this.$router.push('/co/adminContent');
                  });
                }).catch(() => {
                  DialogService.setLoaderVisible(false);
                  DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
                });
              } else {
                DialogService.setLoaderVisible(false);
                DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe(() => {
                  this.$router.push('/co/adminContent');
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

<style lang="scss" src="./EditContent.scss" />
