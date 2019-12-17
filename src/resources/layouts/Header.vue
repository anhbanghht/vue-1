<template>

  <nav class="fixed-top navbar navbar-toggleable-md navbar-inverse navbar-global">
    <div class="header-wrap header-wrap-opes">

      <b-navbar toggleable="lg" type="dark" variant="info">

        <b-navbar-brand href="#">
          <button class="navbar-btn-side-menu-toggle" @click="sideMenuToggle">
            <i class="fa fa-lg fa-toggle-off"></i>
          </button>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>


          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret v-if="userSession">
              <template slot="button-content">
                <FaceIcon :avatar="userSession.avatar" :iconSize="40" />
                <span class="mini-profile-userinfo-name font-weight-bold">{{ userSession.userName }}</span>
              </template>

              <b-dropdown-item class="item-menu-user">
                <MiniProfile :userInfo="{lastName: userSession.userName, firstName: '', avatar: userSession.avatar}" :profileOptions="{iconSize: 75}" />
              </b-dropdown-item>
              <div class="dropdown-divider"></div>

              <b-dropdown-item class="item-menu-user" to="/re/userEdit">{{ $t('HEADER.PROFILE') }}</b-dropdown-item>
              <b-dropdown-item class="item-menu-user" to="/re/changePassword">{{ $t('HEADER.CHANGE_PASS') }}</b-dropdown-item>

              <div class="dropdown-divider"></div>
              <b-dropdown-item class="item-menu-user" @click.prevent="logout">{{ $t('LOGOUT') }}</b-dropdown-item>
            </b-dropdown>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

    </div>
  </nav>
</template>
<script>
  import RegistrationService from '../../services/registration.service'
  import ShareValueService from '../../services/shareValue.service'
  import FaceIcon from '../../components/FaceIcon/FaceIcon.vue'
  import MiniProfile from '../../components/MiniProfile/MiniProfile.vue'

  import $ from 'jquery'

  export default {
    name: 'LayoutDefault',
    components: {
      FaceIcon,
      MiniProfile
    },
    props: {
      msg: String
    },
    data: () => ({
      userSession: {},

    }),
    created() {
      this.userSession = ShareValueService.getUserSession();
      if (!this.userSession) {
        ShareValueService.fetchUserSession().then((res) => {
          this.userSession = res;
        });
      }
      // this.windowHeight = $(window).height() - 50;
      // this.windowWidth = $(window).width() < 991;
    },
    mounted() {
      window.addEventListener('resize', this.onResize)
    },
    methods: {
      onResize() {
        if (!window.matchMedia('(max-width:991px)').matches) {
          // this.sideMenuHide();
        }
      },

      sideMenuToggle() {
        if ($('.side-menu') && $('.side-menu').hasClass('side-menu-hide')) {
          this.sideMenuShow();
        } else {
          this.sideMenuHide();
        }
      },

      sideMenuShow() {
        $('.side-menu').addClass('side-menu-show').removeClass('side-menu-hide');
        $('.content-wrap').addClass($('.content-wrap').data('effect'));
        // this.showOverflow();
        $('.navbar-btn-side-menu-toggle').find('i').removeClass('fa-toggle-off').addClass('fa-toggle-on');
      },

      sideMenuHide() {
        $('.side-menu').removeClass('side-menu-show').addClass('side-menu-hide');
        $('.content-wrap').removeClass($('.content-wrap').data('effect'));
        // this.hideOverflow();
        $('.navbar-btn-side-menu-toggle').find('i').removeClass('fa-toggle-on').addClass('fa-toggle-off');
      },
      //
      // showOverflow() {
      //   if (this.windowWidth) {
      //     $('.content-wrap').css({
      //       'height': this.windowHeight,
      //       'overflow-y': 'hidden'
      //     });
      //     $('body').css('overflow-y', 'hidden');R
      //   }
      // }
      //
      // hideOverflow() {
      //   if (this.windowWidth) {
      //     $('.content-wrap').css({
      //       'height': 'auto',
      //       'overflow-y': 'auto'
      //     });
      //     $('body').css('overflow-y', 'scroll');
      //   }
      // }

      logout() {
        RegistrationService.logout().then(() => {
          ShareValueService.removeAccessToken();
          ShareValueService.clearUserSession();
          this.$router.push('/login');
        }).catch((error) => {
          console.log(error);
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/style/_import.scss';
  .fixed-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
  }
  .navbar {
    padding: 0 !important;
  }

  .header-wrap-opes {
    padding: 0 1rem;
    min-height: 50px;
    width: 100%;
    align-items: center;
    background-color: $opes-symbol-color;

    .bg-info {
      background-color: $opes-symbol-color !important;

      .navbar-toggler {
        padding: 2px 6px 3px;
        z-index: 999;
        right: 6px;
        border-color: white;
        color: white;
      }
    }
  }

  .btn-link {
    padding: 0em 1em;
    color: #FFFFFF !important;
    &:hover, &:active {
      color: rgba(255, 255, 255, 0.75) !important;
    }
    span {
      font-size: 14px;
      font-weight: 600;
      padding: 0 10px;
      color: #FFFFFF;

      &:hover, &:active {
        color: rgba(255, 255, 255, 0.75) !important;
      }
    }
  }

  .navbar-btn-side-menu-toggle {
    left: 0;
    font-size: 1.375rem;
    background: transparent;
    border-width: 0;
    color: #fff;
    outline: 0;
    z-index: 998;
    padding-left: .5rem;

    .fa {
      color: #fff;
    }
  }

  .item-menu-user {
    a {
      &:hover, &:active {
        background: #ffffff;
        color: $opes-symbol-color;
      }
    }
  }

  @media (min-width: 992px) { //@include media-breakpoint-up(lg)
    .navbar-toggleable-md {
      .navbar-btn-side-menu-toggle {
        display: none;
      }
    }
  }
</style>

