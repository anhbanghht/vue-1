<template>
  <div class="layout-default">

    <Header/>

    <div class="page-wrap">
      <nav class="side-menu side-menu-hide">
        <div class="search search-side-menu">

          <!--search input -->
          <form class="search-side-menu-form ng-untouched ng-pristine ng-valid">
            <input class="search-input ng-pristine ng-valid ng-touched" type="text"  placeholder="Searching">
            <button class="search-btn" type="submit">
              <i aria-hidden="true" class="fa fa-search"></i>
            </button>
          </form>

          <SideMenu />
        </div>
      </nav>

      <!--Content Main-->
      <main class="content-wrap" data-effect="push">
        <div class="container-fluid">
          <slot/>
        </div>
      </main>
    </div>

  </div>
</template>
<script>
  import Header from './Header.vue';
  import SideMenu from './SideMenu/SideMenu.vue';
  export default {
    name: 'LayoutDefault',
    components: {
      Header,
      SideMenu
    },
    props: {
      msg: String
    },
    created() {
      console.log('layout default');
    }
  }
</script>
<!--<script lang="ts">-->
  <!--import { Component, Vue } from 'vue-property-decorator';-->
  <!--import Header from './Header.vue';-->
  <!--import SideMenu from '@/resources/layouts/SideMenu/SideMenu.vue';-->

  <!--@Component({-->
    <!--components: {-->
      <!--Header,-->
      <!--SideMenu-->
    <!--}-->
  <!--})-->
  <!--export default class LayoutDefault extends Vue {-->

    <!--created() {-->
      <!--console.log('layout default');-->
    <!--}-->
  <!--}-->
<!--</script>-->

<style lang="scss">
  .side-menu {
    position: fixed;
    width: 292px;
    top: 50px;
    bottom: 0;
    border-right: 1px solid #EEE;
    overflow-y: auto;
    z-index: 999;
    padding: 20px 0 20px 20px;
    background-color: #FFF;
    will-change: transform;
    transition: left 300ms;
  }

  .content-wrap {
    padding-top: 0px;
    position: relative;
    margin-left: 292px;
    top: 50px;

    .container-fluid {
      padding-right: 8px;
      padding-left: 8px;
      text-align: justify;
    }
  }
  
  @media (max-width: 991px) {
    .content-wrap.push {
      transform: translate(292px, 0);
    }
    .content-wrap {
      margin-left: 0px;
      transition: all 300ms;
    }
  }
</style>

