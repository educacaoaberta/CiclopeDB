// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import map from './map'
import functions from './functions'
import { EventBus } from './eventBus'
import RightSidebar from './components/RightSidebar'
import InfoPolos from './components/InfoPolos'
import InfoIpes from './components/InfoIpes'
import InitialSidebar from './components/InitialSidebar'

Vue.component('right-sidebar', RightSidebar)
Vue.component('info-polos', InfoPolos)
Vue.component('info-ipes', InfoIpes)
Vue.component('initial-sidebar', InitialSidebar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    seen: true
  }
})
