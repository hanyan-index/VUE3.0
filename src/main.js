import Vue from "vue";
import VueCompositionApi from '@vue/composition-api';
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 自定义阿里图标库 (全局组件)
import './icons'

// 自定义全局方法
import global from '@/utils/global.js'

// 路由守卫
import premit from './router/premit'
Vue.use(global);
Vue.use(VueCompositionApi);
Vue.use(ElementUI);
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
