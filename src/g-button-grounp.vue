<template>
    <div class="button-grounp">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        mounted(){
//            console.log(this.$el.children)
            for(let node of this.$el.children){
                if(node.nodeName.toLocaleLowerCase() === 'div'){
                    console.warn('g-button插件外层不能使用div')
                    return
                }
            }
        }
    }
</script>
<style lang="scss">
    .button-grounp{
        display: inline-flex;
        vertical-align: middle;
        >.g-button{
            border-radius: 0;
            /*不适用划入的时候*/
            /*&:not(:first-child){
                border-left:none;
            }*/
            margin-left:-1px;

            &:first-child{
                border-radius: var(--border-radius) 0 0 var(--border-radius);
            }
            &:last-child{
                border-radius: 0 var(--border-radius)  var(--border-radius) 0;
            }
            &:hover{
                position: relative;z-index: 1;
            }
         }
    }
</style>