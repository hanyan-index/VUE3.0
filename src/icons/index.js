import Vue from "vue";

import svgIcon from './svgIcon'

Vue.component("svg-icon", svgIcon);


/**
 * require.context ,读取指定目录的所有文件
 * 参数1   目录
 * 参数2   是否遍历子级目录
 * 参数3   定义遍历文件规则
 */
const req = require.context('./svg', false, /\.svg$/)   // 正则表达式，表示以svg结尾的文件
const requireAll = requireContext =>{
    console.log("requireContext.keys(): " +requireContext.keys())
    return requireContext.keys().map(requireContext)
}
requireAll(req)
