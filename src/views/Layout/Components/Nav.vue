<template>
    <div id="nav-warp">
        <h1 class="logo"><img src="../../../assets/images/administrators.jpg" alt=""></h1>
        <el-menu
                default-active="1-4-1"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                background-color="transparent"
                text-color="#fff"
                active-text-color="#fff"
                router
        >
            <template  v-for="(item,index) in routers">
                <el-submenu v-if="!(item.hidden)" :index="index + '' " :key="item.id">
                    <!--一级菜单-->
                    <template slot="title">
                        <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <!--子级菜单-->
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">
                        <svg-icon :iconClass="subItem.meta.icon" :className="subItem.meta.icon" />
                        <span slot="title">{{subItem.meta.name}}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from '@vue/composition-api';

    export default {
        name: "layoutNav",
        setup(props, { root }){
            // 数据
            const routers = reactive(root.$router.options.routes);
            console.log(routers)

            // 监听isCollapse
             const isCollapse = computed(()=> root.$store.state.app.isCollapse )

            return{
                isCollapse,
                routers
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";
    .logo{
        text-align: center;
        img{
            margin: 28px auto 25px;
            width: 92px;
            @include webkit(transtion, all .3s ease 0s)
        }
    }
    #nav-warp{
        position: fixed;
        width: $navWidth;
        left: 0;
        top: 0;
        height: 100vh;
        background-color: #344a5f;

        @include webkit(transition,all .3s ease 0s);

        svg{
            font-size: 20px;
            margin-right: 10px;
        }
    }
    .open{
         #nav-warp{
             width: $navWidth;
         }
    }
    .close{
        #nav-warp{ width: $navWidthMin; }
        .logo img{ width: 60%; }

    }
</style>