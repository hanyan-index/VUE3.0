<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
import { computed, ref, onMounted } from '@vue/composition-api';
export default {
    name:'svgIcon',
    props:{
        iconClass:{
            type: String,
            default: '',
            required:true,  // true表示必填项，不填会报错
            // validator:(value)=>{  // 校验规则
            //     return  value > 0
            // }
        },
        className:{
            type: String,
            default: ''
        }
    },
    setup(props){
        const iconName = computed(()=> `#icon-${props.className}`)
        const svgClass = computed(()=>{
            if(props.className){
                return `svg-icon ${props.className}`
            }else{
                return `svg-icon `
            }
        })

        return{
            iconName,
            svgClass
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon{
    width:1em;
    height: 1em;
    // fill: currentColor; 若要设置svg图标的颜色则必须加上
    fill: currentColor;
    color: cyan;
}
</style>