import cookie from 'cookie_js';

const toKen = 'admin_toKen';
const userName = 'admin_userName';

export function getToken(){
    return cookie.get(toKen)
}

export function setToken(value){
    cookie.set(toKen,value)
}

export function removeToken(){
    cookie.remove(toKen)
}

export function getUserName(){
    return cookie.get(userName)
}

export function setUserName(value){
    cookie.set(userName,value)
}

export function removeUserName(){
    cookie.remove(userName)
}