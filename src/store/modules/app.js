import { Login } from '@/api/login'
import { setToken, setUserName, getUserName } from '@/utils/app';

const state = {
  // isCollapse:JSON.parse(Cookie.get('isCollapse')) || false,
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  // isCollapse:JSON.parse(localStorage.getItem('isCollapse')) || false,

  toKen : '',
  userName:getUserName() || ''
}
const getters = {

}

const mutations = {   //必须的    同步的    没有回调处理事情
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse

    // Cookie.set('isCollapse',JSON.stringify(state.isCollapse))

    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    // sessionStorage存储在浏览器中，关闭浏览器后清楚数据
    // localStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    // localStorage存储在内存中，关闭浏览器依旧存在，必须手动清除数据

    console.log(state.isCollapse)
  },
  SET_TOKEN(state,value){
    state.toKen = value
  },
  SET_USERNAME(state,value){
    state.userName = value
  }
}

const actions = {
  login(content, requestData) {
    return new Promise((resolve, reject) => {

      // 登录接口
      Login(requestData).then(response => {

         // 存储 token username 
         let data = response.data.data;
         content.commit('SET_TOKEN',data.token);
         content.commit('SET_USERNAME',data.username);

        setToken(data.token);
        setUserName(data.username);

        resolve(response)

       
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default { namespaced: true, state, getters, mutations, actions };
