import Vue from "vue";
import moment from "moment";

Vue.filter('ToUpperCaseFilter', function (value) {
  console.log(value);
  return value.toUpperCase();
});
Vue.filter('ToLowerCaseFilter', function (value) {
  return value.toLowerCase();
});
Vue.filter('DateTimeFilter', function (value, typeFormat) {
  // YYYY-MM-DD (ddd), YYYY-MM-DD (dd)
  if (moment(value).isValid()) {
    return moment(value).format(typeFormat);
  }
  return null;
});

// Vue.directive('click-outside', {
//   bind: function (el, binding, vnode) {
//     el.clickOutsideEvent = function (event) {
//       // here I check that click was outside the el and his childrens
//       if (!(el == event.target || el.contains(event.target))) {
//         // and if it did, call method provided in attribute value
//         vnode.context[binding.expression](event);
//       }
//     };
//     document.body.addEventListener('click', el.clickOutsideEvent)
//   },
//   unbind: function (el) {
//     document.body.removeEventListener('click', el.clickOutsideEvent)
//   },
// });
//
















