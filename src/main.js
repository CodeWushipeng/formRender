import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import VueEditor from 'vue2-editor'

import 'element-ui/lib/theme-chalk/index.css'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/vue/vue'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/javascript-hint'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

//导入tablemaking组件
import TableMaking from 'table-making'
import 'table-making/dist/TableMaking.css'

Vue.use(VideoPlayer)
Vue.use(VueCodemirror)
Vue.use(VueI18n)
Vue.use(VueEditor)

const messages = {
  'en-US': {
    header: {
      title: 'FormMaking',
      document: 'Docs',
      pricing: 'Pricing',
      advanced: 'Advanced',
    }
  },
  'zh-CN': {
    header: {
      title: '表单设计器',
      document: '使用文档',
      pricing: '商业授权',
      advanced: '高级版本',
    }
  }
}

Vue.locale('en-US', {...enLocale, ...messages['en-US']})
Vue.locale('zh-CN', {...zhLocale, ...messages['zh-CN']})
Vue.config.lang = 'zh-CN'

Vue.use(ElementUI, { size: 'small' })

// import 'form-making/dist/FormMaking.css'
// import FormMaking from 'form-making'
import FormMaking from './index'
Vue.use(FormMaking)

//注册table-macking
Vue.use(TableMaking, { lang: 'zh-CN', locale: Vue.locale })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
