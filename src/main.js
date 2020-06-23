import Vue from 'vue'

import 'minireset.css/minireset.sass' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import App from '@/App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import '@/directive/index' // 全局指令
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })

Vue.config.productionTip = false

const { mockXHR } = require('../mock')
mockXHR()

new Vue({
  router,
  store,
  render(func) {
    return func(App)
  }
}).$mount('#app')
