import axios from "axios";
import { Message } from 'element-ui';

// 创建axios，初始变量service

// 手把手撸码前端API， 地址:http://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === 'production'?'':'/devApi';
const service = axios.create({
    baseURL: BASEURL,
    timeout: 5000
});

// 添加请求拦截器
/*
* 请求接口前，做一些数据处理(请求头)
*/
service.interceptors.request.use(function(config){
    // 在发送请求之前做得事情

    config.headers['Tokey'] = '';
    return config;
},function(error){
    // 请求错误做得事情

    // 最终目的是在请求头添加参数
    return Promise.reject(error);
});

// 添加响应拦截器
/*
* 请求接口后，返回数据进行拦截
*/
service.interceptors.response.use(function(response){
    let data = response.data;
    if(!(data.resCode === 0)) {
        Message.error(data.message);
        return Promise.reject(data);
    }else{
        return response;
    }
},function(error){
    // 对请求错误做的事情
    return Promise.reject(error);
});
export default service;

/**
 * 使用export default时，不能存在多个default，只能有一个
 * 文件引入时不需要花括号引起来
 */