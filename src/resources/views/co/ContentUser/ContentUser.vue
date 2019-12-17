<template src="./ContentUser.html" />

<script>
  import LayoutDefault from '../../../layouts/LayoutDefault.vue';
  import DialogService from '../../../../services/dialog.service';
  import ContentService from '../../../../services/content.service';
  import ShareValueService from '../../../../services/shareValue.service';

  import PageHeader from "../../../../components/PageHeader/PageHeader.vue";
  import MiniProfile from "../../../../components/MiniProfile/MiniProfile.vue";
  import {URL_IMAGE_CONTENT_DEFAULT, VUE_APP_API_URL_IMAGE} from '../../../../common/Helper';

  import popover from 'vue-popover';

  import $ from 'jquery';

  export default {
    name: 'ContentUser',
    components: {
      PageHeader,
      MiniProfile,
      popover
    },
    data: () => ({
      link_image_content: VUE_APP_API_URL_IMAGE,
      link_image_content_default: URL_IMAGE_CONTENT_DEFAULT,
      contents: [],
      conditionsSearch: {
        userId: '',
        hashTag: '',
        page: 0,
        size: 10,
      },
      busy: false,
      _load: true
    }),
    created() {
      this.$emit('update:layout', LayoutDefault)

      // if (this.$route.fullPath === '/co/my-content') {
      //   ShareValueService.fetchUserSession().then((userSession) => {
      //     if (userSession) {
      //       this.conditionsSearch.userId = userSession.id;
      //       this.getDetailContentUser();
      //     }
      //   }).catch(() => {
      //     DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
      //   });
      // } else {
      //   this.conditionsSearch.userId = this.$route.query['userId'] ? this.$route.query['userId'] : '';
      //   this.conditionsSearch.hashTag = this.$route.query['hashTag'] ? this.$route.query['hashTag'] : '';
      //   this.getDetailContentUser();
      // }
    },
    beforeMount() {
      if (this.$route.fullPath === '/co/my-content') {
        ShareValueService.fetchUserSession().then((userSession) => {
          if (userSession) {
            this.conditionsSearch.userId = userSession.id;
            this.getDetailContentUser();
          }
        }).catch(() => {
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
        });
      } else {
        this.conditionsSearch.userId = this.$route.query['userId'] ? this.$route.query['userId'] : '';
        this.conditionsSearch.hashTag = this.$route.query['hashTag'] ? this.$route.query['hashTag'] : '';
        this.getDetailContentUser();
      }
    },
    methods: {
      getDetailContentUser() {
        this.busy = true;
        DialogService.setLoaderVisible(true);
        ContentService.getDetailContentUser(this.conditionsSearch).then((res) => {
          DialogService.setLoaderVisible(false);

          if (res['data']['contents']) {
            for (let i = 0; i < res['data']['contents'].length; i++) {
              res['data']['contents'][i]['showMore'] = false;
            }
          }

          if (this.conditionsSearch.page === 0) {
            this.contents = res['data']['contents'];
          } else {
            this.contents = this.contents.concat(res['data']['contents']);
          }

          this._load = res['data']['contents'].length === this.conditionsSearch.size;
          setTimeout(() => {
            this.busy = false;
          }, 2000);

        }).catch(() => {
          this.busy = false;
          DialogService.setLoaderVisible(false);
          DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));

          if (this.conditionsSearch.page > 0) {
            this.conditionsSearch.page--;
          }
        })
      },

      loadContentUser() {
        if (!this.busy && this._load) {
          this.conditionsSearch.page++;
          this.getDetailContentUser();
        }
      },

      showMoreContent(event, index) {
        this.contents[index].showMore = !this.contents[index].showMore;

        const element = $('.description-content-' + index);
        if (element.offset().top && !this.contents[index].showMore) {
          window.scrollTo(window.screenX, element.offset().top);
        }
      },

      detailContentUser(hashTag) {
        this.$router.push({path: '/co/contentUser', query: {userId: null, hashTag: hashTag}});
        this.conditionsSearch.userId = '';
        this.conditionsSearch.hashTag = hashTag;
        this.conditionsSearch.page = 0;
        this.getDetailContentUser();
      }
    }
  }
</script>

<style lang="scss" src="./ContentUser.scss" />
