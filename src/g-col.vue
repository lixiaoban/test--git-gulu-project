<template>
    <div class="g-col" :class="colClass" :style="colStyle">
        <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props:{
            span:{
                type:[Number,String],
//                default:24
            },
            offset:{
                type:[Number,String]
            },
            phone:{
                type:Object,
                validator(value){
                    let keys = Object.keys(value)
                    let flag = true
                    keys.forEach((vm)=>{
                        if(!['span','offset'].includes(vm)){
                            flag = false
                        }
                    })
                    return flag
                }
            }
        },
        data(){
            return{
                gutter:0
            }
        },
        computed:{
            colClass(){
                let {span,offset,phone} = this
                return [
                    span&&`col-${span}`,
                    offset&&`offset-${offset}`,
                    phone&&`phoneSpan-${phone.span}`,
                    phone&&`phoneOffset-${phone.offset}`
                ]
            },
            colStyle(){
                return {
                    marginLeft:this.gutter/2+'px',
                    marginRight:this.gutter/2+'px'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .g-col{
        /*width:100%;*/
        min-height:3em;
        background: #3c8cff;
        border-radius: 2px;
        color: #000;
        $class:col-;
        @for $n from 1 through 24 {
            &.#{$class}#{$n} {
                width: ($n / 24) *100%
            }
        };

        $class:offset-;
        @for $n from 1 through 24 {
            &.#{$class}#{$n} {
                padding-left: ($n / 24) *100%!important;
            }
        }

        @media (max-width: 576px) {
            $class:phoneSpan-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    width: ($n / 24) *100%
                }
            };
            $class:phoneOffset-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    padding-left: ($n / 24) *100%!important;
                }
            };
        }
    }
</style>