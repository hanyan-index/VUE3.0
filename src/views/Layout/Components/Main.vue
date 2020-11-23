<template>
    <div id="main-warp">
        <div class="main-content">
            <div class="content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "layoutMain"
    }
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-warp{
    height: 100vh;
    // position: fixed;
    // left: $navWidth;
    // top: 75px;
    // bottom: 0;
    // right: 0;
    // border: 30px solid #FDF5E6;
    // -webkit-box-sizing: border;
    // border-bottom: none;
}
.main-content{
    widows: 100%;
    height: 100%;
    padding-top: $layoutHeader + 30;
    padding-right: 30px;
    @include webkit(box-sizing,border-box);
    @include webkit(transition,all .3s ease 0s);
}
.content{
    width: 100%;
    height: 100%;
    min-width: 1300px;
    padding: 30px 30px 0 30px;
    background-color: #fff;
    @include webkit(box-sizing,border-box)
}

.open{
    .main-content{
        padding-left: $navWidth + 30;
    }
}
.close{
    .main-content{
        padding-left: $navWidthMin;
    }
}



</style>