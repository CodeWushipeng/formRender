<template>
<div>
    this is testjs
    <div>
        <!--{{transObj}}-->
    </div>
</div>
</template>

<script>

    // import {utliTools,evalFunc,user,platform,func} from './ls/utils-fn';
    // import {nodes,inputConfig_,inputConfig,result} from './ls/inputConfig'
    //
    // console.log('utliTools',utliTools);
    export default {
        name: "index.js",
        data(){
            return {
                // util: utliTools,
                transObj:null
            }
        },
        created(){
            // console.log('nodes',{...nodes});

            try {
                // 1
                // const testCode = eval("(" + result + ")");
                // const testCode = eval("(" + inputConfig_ + ")");
                // console.log('typeof execute', testCode);
                // console.log('typeof execute',typeof testCode);

                // console.log('excute result:', testCode(user,platform,nodes,this.util));

            }catch (error) {
                // console.log('inputConfig解析出错',inputConfig)
                throw new Error(error);
            }
        }
    }
</script>

<style scoped>

</style>
