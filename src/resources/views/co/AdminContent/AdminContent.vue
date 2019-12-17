<template src="./AdminContent.html" />

<script>
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import PageHeader from "../../../../components/PageHeader/PageHeader.vue";

  import ContentService from '../../../../services/content.service';
  import DialogService from '../../../../services/dialog.service';
  import { VUE_APP_API_URL_IMAGE, URL_IMAGE_CONTENT_DEFAULT } from '../../../../common/Helper';

  import vSelect from 'vue-select';
  import DatePicker from 'vue2-datepicker';
  import moment from 'moment';

  export const DatePost = {
    All: 0,
    SAME: 6,
    BEFORE: 1,
    SAME_OR_BEFORE: 2,
    AFTER: 3,
    SAME_OR_AFTER: 4,
    BETWEEN: 5
  };

  export default {
    name: 'AdminContent',
    components: {
      PageHeader,
      vSelect,
      DatePicker
    },
    data: () => ({
      DatePost,
      contents: {},
      link_image_content: VUE_APP_API_URL_IMAGE,
      link_image_content_default: URL_IMAGE_CONTENT_DEFAULT,
      listHashTag: [],
      conditionSearch: {
        hash_tag: [],
        typeDatePost: DatePost.All,
        dateStart: '',
        dateEnd: ''
      },
      dateStart: '',
      dateEnd: '',
      error: {
        dateStart: '',
        dateEnd: ''
      }
    }),
    created() {
      this.$emit('update:layout', LayoutDefault);
      this.listContent();
    },
    methods: {

      listContent() {
        DialogService.setLoaderVisible(true);
        ContentService.getListContent().then((res) => {
          DialogService.setLoaderVisible(false);
          this.contents = res['data']['contents'];
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

      searchContent() {
        this.error.dateStart = '';
        this.error.dateEnd = '';

        if (this.conditionSearch.typeDatePost === DatePost.All) {
          this.conditionSearch.dateStart = '';
          this.conditionSearch.dateEnd = '';
        } else {
          this.conditionSearch.dateStart = this.dateStart ? moment(this.dateStart).format('YYYY-MM-DDTHH:mmZZ') : '';
          if (!this.conditionSearch.dateStart) {
            this.error.dateStart = this.$t('CO.ADMIN_CONTENT.MSG.REQUIRED_DATE');
          }

          if (this.conditionSearch.typeDatePost === DatePost.BETWEEN) {
            this.conditionSearch.dateEnd = this.dateEnd ? moment(this.dateEnd).format('YYYY-MM-DDTHH:mmZZ') : '';
            if (!this.conditionSearch.dateEnd) {
              this.error.dateEnd = this.$t('CO.ADMIN_CONTENT.MSG.REQUIRED_DATE');
            } else {
              if (!moment(this.conditionSearch.dateStart).isBefore(this.conditionSearch.dateEnd)) {
                this.error.dateStart = this.$t('CO.ADMIN_CONTENT.MSG.ERROR_DATE');
                this.error.dateEnd = this.$t('CO.ADMIN_CONTENT.MSG.ERROR_DATE');
              }
            }
          }
        }
        if (!(this.error.dateStart || this.error.dateEnd)) {
          DialogService.setLoaderVisible(true);
          ContentService.getListContent(this.conditionSearch).then((res) => {
            DialogService.setLoaderVisible(false);
            this.contents = res['data']['contents'];
          }).catch(() => {
            DialogService.setLoaderVisible(false);
            DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
          });
        }
      },

      deleteContent(content) {
        DialogService.setLoaderVisible(true);
        const model = {
          contentId: content.id,
          // image: content.image
        };
        ContentService.deleteContent(model).then(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showSuccess(this.$t('MSG.SUCCESS'), this.$t('BTN.OK')).subscribe(() => {
            this.$router.push('/co/listContent');
          });
        }).catch(() => {
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        });
      },

      editContent(contentId) {
        this.$router.push('/co/editContent/' + contentId);
      },

      detailContent(contentId) {
        this.$router.push('/co/detailContent/' + contentId);
      }
    }
  }
</script>

<style lang="scss" src="./AdminContent.scss" />
