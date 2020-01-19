<template>
    <div class="tab-header">
        <slot></slot>
        <div class="tabLine" ref="line"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name:'GuluTabHeader',
        inject:['eventBus'],
        created(){
//            console.log(this.eventBus)
        },
        mounted(){
            this.eventBus.$on('update:selected',(name,vm)=>{
                let {width,height,left,top} = vm.$el.getBoundingClientRect()
//                console.log(left)
                left = left - 20
                this.$refs.line.style.width = `${width}px`
                this.$refs.line.style.left = `${left}px`
            })
        }
    }
</script>

<style lang="scss" scoped>
    .tab-header{
        display: flex;
        flex-shrink: 0;
        $border-color:#3c8cff;
        position:relative;
        >.tabLine{
            height:1px;
            /*width:50px;*/
            border-bottom: 2px solid $border-color;
            position: absolute;
            bottom:0px;
            transition:all 200ms;
        }
    }
</style>