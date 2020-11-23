import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入局部组件
import Layout from '@/views/Layout'

const routes = [
    {
        path: "/",
        redirect: "login",
        hidden:true,
        meta: {
            name:"主页",
        }
    },
    {
        path: "/login",
        name: "Login",
        hidden:true,
        meta:{
            name:'登录',
        },
        component:() =>
        import("../views/Login")
    },
    {
        path: "/about",
        name: "about",
        hidden:true,
        meta:{
            name:'测试',
        },
        component:() =>
        import("../views/Login/about.vue")
    },
    {
        path: "/vue2",
        name: "vue2",
        hidden:true,
        meta:{
            name:'vue2.0语法',
        },
        component:() =>
        import("../views/Login/index2.vue")
    },
    {
        path: "/vue3",
        name: "vue3",
        hidden:true,
        meta:{
            name:'vue3.0写法',
        },
        component:() =>
        import("../views/Login/index3.vue")
    },
    /*
    * 控制台
    * */
    {
        path: "/console",
        name: "Console",
        redirect: "index",
        meta:{
            name:'控制台',
            icon:'console'
        },
        component: Layout,
        children:[{
            path: "/index",
            name: "Index",
            meta:{
                name:'首页',
                icon:'consoleIndex'
            },
            component: () =>
                import("../views/Console")
        }]
    },
    /*
    * 信息管理
    * */
    {
        path: "/info",
        name: "Info",
        meta:{
            name:'信息管理',
            icon:'info'
        },
        component: Layout,
        children:[
            {
            path: "/infoIndex",
            name: "InfoIndex",
            meta:{
                name:'信息列表',
                icon:'infoIndex'
            },
            component: () =>
                import("../views/Info")
            },
            {
                path: "/infoCategory",
                name: "InfoCategory",
                meta:{
                    name:'信息分类',
                    icon:'bianji'
                },
                component: () =>
                    import("../views/Info/infoCategory.vue")
            }
        ]
    },
    /*
    * 用户管理
    * */
    {
        path: "/user",
        name: "User",
        meta:{
            name:'用户管理',
            icon:'user'
        },
        component: Layout,
        children:[
            {
                path: "/userIndex",
                name: "UserIndex",
                meta:{
                    name:'用户列表',
                    icon:'userIndex'
                },
                component: () =>
                    import("../views/User")
            }
        ]
    }
];

const router = new VueRouter({
  routes
});

export default router;
