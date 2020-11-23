<template>
    <div id="layout" :class="[ menuStatus ? 'close' : 'open']">
        <layoutHeader />
        <layoutMain />
        <layoutNav />
    </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import layoutHeader from './Components/Header'
import layoutMain from './Components/Main'
import layoutNav from './Components/Nav'

export default {
    name: "layout",
    components:{layoutHeader, layoutMain, layoutNav},
    setup( props, { root } ){
        const menuStatus = computed(()=> root.$store.state.app.isCollapse )

        return {
            menuStatus
        }
    }
}
</script>

<style lang="scss" scoped>

</style>