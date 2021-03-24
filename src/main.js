import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places,drawing,visualization'
  }
});

Vue.use(VueObserveVisibility)

new Vue({
  render: h => h(App),
}).$mount('#app')
