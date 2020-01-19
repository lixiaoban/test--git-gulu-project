<template>
    <div class="tab-pane" :class="paneStyle" v-if="active">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        inject:['eventBus'],
        props:{
            name:{
                type:String|Number,
                required:true
            }
        },
        data(){
            return{
                active:false
            }
        },
        computed:{
            paneStyle(){
                let {active} = this
                return [active&&`paneStyle`]
            }
        },
        created(){
            //监听update:selected事件
            this.eventBus.$on('update:selected',(name,vm)=>{
                if(name === this.name){
                    this.active = true
    //                    console.log(`${this.name}被选中了`)
                }else{
                    this.active = false
    //                    console.log(`${this.name}没有被选中了`)
                }
            })
        },
    }
</script>

<style lang="scss" scoped>
    .tab-pane{
        &.paneStyle{

        }
    }
</style>