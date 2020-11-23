import { Login } from '@/api/login'
const state = {
  // isCollapse:JSON.parse(Cookie.get('isCollapse')) || false
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
  // isCollapse:JSON.parse(localStorage.getItem('isCollapse')) || false
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
  }
}

const actions = {
  login(content, requestData) {
    return new Promise((resolve, reject) => {

      // 登录接口
      Login(requestData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default { namespaced: true, state, getters, mutations, actions };
