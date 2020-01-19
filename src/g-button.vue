<template>
    <button class="g-button" :class="iconPositionClass" @click="$emit('click')">
        <g-icon class="icon-svg" v-if="iconsvg && !loading" :iconsvg="iconsvg"></g-icon>
        <g-icon class="loading icon-svg" v-if="loading" iconsvg="jiazaizhong"></g-icon>
        <div class="g-button-content">
            <slot></slot>
        </div>
    </button>
</template>
<script type="text/ecmascript-6">
    import Icon from './g-icon.vue'
    export default {
        components:{
            'g-icon': Icon
        },
//        props:['iconsvg','iconPosition']
        props:{
            iconsvg:{
                type:String
            },
            loading:{
                type:Boolean,
                default:false,
            },
            iconPosition:{
                type:String,
                default:'left',
//                validator(value){
//                    console.log(value)
//                    return !(value != 'left' || value != 'right');
//                }
            }
        },
        computed:{
            iconPositionClass(){
                let {iconPosition} = this
                return [iconPosition && `icon-${iconPosition}`]
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "var.scss";
    .g-button {
        height: var(--button-height);
        font-size: var(--font-size);
        padding: 0 1em;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        background: var(--border-bg);
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        display:inline-flex;
        .g-button-content{
             order: 2;
        }
        .icon-svg{
             order: 1;
            margin-right:.5em;
        }

        &:hover {
            border-color: var(--border-color-hover);
        }

        &:active {
            background-color: var(--button-active-bg);
        }

        &:focus {
            outline: none;
        }

        &.icon-right{
            .g-button-content{
                order: 1;
            }
            .icon-svg{
                order: 2;
                margin-left:.5em;
            }
        }
        .loading{
            animation:spin infinite linear 1s ;
        }
    }
</style>