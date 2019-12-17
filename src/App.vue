<template>
  <div id="app">

    <div class="loader-wrap loader-wrap-bg" :class="{'loader-show': isLoaderVisible}">
      <div class="loader-overlay"></div>
      <div class="loader">
        <i class="fa fa-spinner fa-pulse fa-2x fa-fw loader-icon"></i>
        <p class="loader-text">{{$t('LOADING')}}...</p>
      </div>
    </div>

    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>

    <Modal></Modal>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import DialogService from './services/dialog.service'
import Modal from './components/Modal/Modal.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    Modal
  },
  data: () => ({
    layout: 'div',
    isLoaderVisible: false
  }),
  created() {
    DialogService.showLoader.subscribe((res) => {
        this.isLoaderVisible = res;
      }
    );
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .loader-wrap {
    display: none;
  }

  .loader-wrap .loader-overlay {
    display: none;
    position: fixed;
    width: 100%;
    height: calc(100% + 50px);
    background: rgba(0, 0, 0, 0.2);
    z-index: 1031;
    top: -50px;
  }

  .loader-wrap .loader {
    background: #fff;
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    position: fixed;
    top: calc(50% - 50px);
    left: 50%;
    z-index: 1032;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .loader-wrap .loader-icon {
    color: #777;
  }

  .loader-wrap .loader-text {
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: 0.875rem;
  }

  .loader-wrap-bg .loader-overlay {
    display: block;
  }

  .loader-wrap.loader-show {
    display: block;
  }
</style>
