import { createApp } from 'vue'
import App from './App.vue'
import { installElement } from './basic_service/plugin/element'
import router from './basic_service/router'
import BasePage from './components/common/BasePage.vue'

// 引入浏览器格式化css文件
import 'normalize.css'
import 'font-awesome/css/font-awesome.css'
import './assets/less/public.less'

const app = createApp(App)
// 安裝elementUI
installElement(app)
// 引入基础公共页面
app.component('BasePage', BasePage)
app.use(router)
app.mount('#app')
