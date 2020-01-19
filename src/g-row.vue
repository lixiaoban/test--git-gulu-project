<template>
    <div class="g-row" :style="colStyle" :class="colClass">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props:{
            gutter:{
                type:[Number,String]
            },
            align:{
                type:String,
                default:'left',
//                validator(value){
//                    return ['left','center','right'].includes(value)
//                }
            }
        },
        computed:{
            colClass(){
                let {align} = this
                return [align&&`col-${align}`]
            },
            colStyle(){
                return {
                    marginLeft:-this.gutter/2+'px',
                    marginRight:-this.gutter/2+'px'
                }
            }
        },
        mounted(){
            this.$children.forEach((vm) =>{
                vm.gutter = this.gutter
            })
        }
    }
</script>
<style lang="scss" scoped>
    .g-row{
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        &.col-left{
            justify-content: flex-start;
        }
        &.col-center{
            justify-content: center;
        }
        &.col-right{
            justify-content: flex-end;
        }
    }

</style>