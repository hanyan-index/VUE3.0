import { MessageBox } from 'element-ui';
export default {
    install(Vue, options) {
        Vue.prototype.confirm = (params)=> {
            MessageBox.confirm(params.content, params.tip || "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            })
                .then(() => {
                    params.obj && params.obj()

                //    if(params.obj){
                //     params.obj()
                //    }
                })
                .catch(() => {
                    // root.$message({
                    //     type: "info",
                    //     message: "已取消删除",
                    // });
                });
        }
    }

}