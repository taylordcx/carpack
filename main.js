import Vue from 'vue'
// import uView from "uview-ui";
// Vue.use(uView);
import App from './App'

// import {myRequest} from './url/api.js'
 
// Vue.prototype.$myRequest = myRequest
Vue.prototype.userid = ''
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
