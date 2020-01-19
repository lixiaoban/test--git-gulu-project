<template>
    <div class="tab-item" @click="xxx" :class="itemStyle">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name:'GuluTabItem',
        inject:['eventBus'],
        props:{
            name:{
                type:String|Number,
                required:true
            },
            disabled:{
                type:Boolean,
                default:false,
            }
        },
        data(){
            return{
                active:false
            }
        },
        computed:{
            itemStyle(){
                let {active,disabled} = this
                return {
                    tabActive:active,
                    tabDisabled:disabled
                }
//                return [
//                        active&&`itemStyle`,
//                        disabled&&`disabledStyle`
//                       ]
            }
        },
        created(){
            //监听update:selected事件
            this.eventBus.$on('update:selected',(name)=>{
                if(name === this.name){
                    this.active = true
//                    console.log(`${this.name}被选中了`)
                }else{
                    this.active = false
//                    console.log(`${this.name}没有被选中了`)
                }
            })
        },
        methods:{
            xxx(){
                if(this.disabled) return
                this.eventBus.$emit('update:selected',this.name,this)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tab-item{
        padding:10px 20px;
        $background:#3c8cff;
        $disabledColor:#ddd;
        &.tabActive{
            color: $background;
            font-weight:600;
        }
        &.tabDisabled{
            color: $disabledColor;
        }
    }
</style>