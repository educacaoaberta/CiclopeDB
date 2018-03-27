// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// jQuery
import jQuery from 'jquery'
global.$ = jQuery
// DataTables
import dataTables from 'datatables.net'
import 'datatables.net-dt/css/jquery.dataTables.css'
// jQuery UI
var tabs = require( "jquery-ui/ui/widgets/tabs" );
// Mapbox
import map from './map'
import 'mapbox-gl/dist/mapbox-gl.css'
// Chart
import Chart from 'chart.js'
// Carrega os gráficos
import functions from './functions'
// EventBus
import { EventBus } from './eventBus'

// Components
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
  el: '#app'
})
