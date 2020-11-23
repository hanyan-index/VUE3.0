import router from "./index";

import { getToken } from '@/utils/app'

const whiteRouter = ['/login'];

router.beforeEach((to, from, next)=>{
    if(getToken()){
        console.log(getToken())
        // next();
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){
            next();
        }else{
            next('/login');
        }
    }
    next()
  })