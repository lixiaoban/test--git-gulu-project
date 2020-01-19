<template>
    <div class="input-wrap" :class="{error}">
        <input :value="value" :disabled="disabled"
        @change="$emit('change',$event.target.value,'h1','h2')"
        @input="$emit('input',$event.target.value)"
        @focus="$emit('focus',$event.target.value)"
        @blur="$emit('blur',$event.target.value)" />
        <template v-if="error">
            <g-icon iconsvg="qq"></g-icon>
            <span>{{error}}</span>
        </template>
    </div>
</template>
<script type="text/ecmascript-6">
    import Icon from './g-icon.vue'

    export default {
        component:{
            'g-icon':Icon
        },
        props:{
            value:{
//                type:String
            },
            disabled:{
                type:Boolean
            },
            error:{
                type:String
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "var.scss";
    .input-wrap{
        width:auto;
        align-items: center;
        display:inline-flex;
        >:not(:last-child){
             margin-right:.3em;
         }
        &.error{
            >input{
                 border:1px solid $colorRed;
                &:hover{
                     border:1px solid $colorRed;
                     box-shadow: inset 0 1px 3px $colorRed;
                 }
             }

        }
        >input{
            border:1px solid #666;
            height:$height;
            width:150px;
            border-radius: 4px;
            padding:0 10px;
            &:hover{
                 border:1px solid $color;
            }
            &:focus{
                 box-shadow: inset 0 1px 3px $color;
                 outline: none;
            }
            &[disabled]{
                background-color: #f1f1f1;
                border-color: #f1f1f1;
                cursor: not-allowed;
            }
        }
    }

</style>