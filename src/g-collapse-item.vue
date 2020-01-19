<template>
    <div class="collapseItem">
        <div class="title" @click="toggle">
            {{title}}
        </div>
        <div class="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name: 'GulucollapseItem',
        props:{
            title:{
                type:String,
                required:true
            },
            name:{
                type:String,
                required:true
            }
        },
        inject:['eventBus'],
        data(){
            return {
                open:false
            }
        },
        mounted(){
            this.eventBus && this.eventBus.$on('update:selected',(names)=>{
                if(names.indexOf(this.name)<0){
                    this.open = false
                }else{
                    this.open = true
                }
            })
        },
        methods:{
            toggle(){
                if(this.open){
                    this.eventBus && this.eventBus.$emit('update:removeSelected',this.name)
                }else{
                    this.eventBus && this.eventBus.$emit('update:addSelected',this.name)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .collapseItem{

        >.title{
             border:1px solid #dddddd;
             margin-top:-1px;
             margin-left:-1px;
             margin-right:-1px;
             min-height:32px;
             display: flex;
             align-items: center;
             padding:0 10px;
             background: #ededed;
        }
        &:first-child{
            >.title{
                 border-top-left-radius: 3px;
                 border-top-right-radius: 3px;
             }
        }
        >.content{
             padding:6px 10px;
            word-break: break-all;
         }
    }
</style>