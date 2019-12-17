<template src="./ListContent.html" />

<script>
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
  import { VUE_APP_API_URL_IMAGE, URL_IMAGE_CONTENT_DEFAULT } from '../../../../common/Helper';

  import ContentService from '../../../../services/content.service';
  import DialogService from '../../../../services/dialog.service';

  export default {
    name: 'ListContent',
    components: {
      PageHeader
    },
    data: () => ({
      contents: [],
      link_image_content: VUE_APP_API_URL_IMAGE,
      link_image_content_default: URL_IMAGE_CONTENT_DEFAULT
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

      // contentId: number
      detailContent(contentId) {
        this.$router.push('/co/detailContent/' + contentId);
      }
    }
  }
</script>

<style scoped lang="scss" src="./ListContent.scss" />
