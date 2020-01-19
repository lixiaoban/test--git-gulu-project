<template>
    <div class="cascaderItem" :style="{height: height}">
        <div class="left">
            <div class="label" v-for="item in items"
                 @click="onClickLabel(item)">
                <span class="text">{{item.name}}</span>
                <span class="icons">
                    <template v-if="item.name == loadingItem.name">
                        <g-icon class="loading" iconsvg="jiazaizhong"></g-icon>
                    </template>
                    <template v-else>
                        <g-icon v-if="rightArrowVisible(item)" iconsvg="arrow-right"></g-icon>
                    </template>
                </span>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-items
                    :items="rightItems"
                    :level="level+1"
                    :selected="selected"
                    :load-data="loadData"
                    :loading-item="loadingItem"
                    @update:selected="onUpdateSelected"
            ></gulu-cascader-items>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Icon from './g-icon.vue'
    export default{
        name:'GuluCascaderItems',
        components:{Icon},
        props:{
            items:{
                type:Array
            },
            height:{
                type:String
            },
            level:{
                type:Number,
                default:0
            },
            loadingItem:{
                type:Object,
                default:() => ({})
            },
            selected:{
                type:Array,
                default:() => []
            },
            loadData:{
                type:Function
            }
        },
        data(){
            return {

            }
        },
        methods:{
            rightArrowVisible(item){
                return this.loadData ? !item.isLeaf : item.children
            },
            onClickLabel(item){
                let copy = JSON.parse(JSON.stringify(this.selected)) //拷贝
                copy[this.level] = item
                copy.splice(this.level+1)
                this.$emit('update:selected',copy)
            },
            onUpdateSelected(newSelected){
                this.$emit('update:selected',newSelected)
            }
        },
        computed:{
            rightItems (){
                let currentSelected = this.selected[this.level]

                if(currentSelected){
                    console.log(this.items)
                    console.log(currentSelected)
                    let selected = this.items.filter((item)=>item.name === currentSelected.name)
                    if(selected && selected[0].children && selected[0].children.length>0){
                        return selected[0].children
                    }
                }

                //if(currentSelected && currentSelected.children){
                //    return currentSelected.children
                //}else{
                //    return null
                //}
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "var.scss";
    .cascaderItem{
        justify-content: center;
        display: inline-flex;
        height:100%;
        .left{
            height:100%;
            padding:.5em 0;
            overflow:auto
        }
        .right{
            height:100%;
            border-left:1px solid $borderColor;
        }
        .label{
            white-space: nowrap;
            padding:.3em 0.8em;
            display: flex;
            align-items: center;
            user-select: none;
            cursor: pointer;
            .icons{
                .loading{
                    animation: spin infinite linear 1.5s;
                }
            }
            &:hover{
                background: #eee;
            }
            .text{
                margin-right:auto;
            }
        }
    }
</style>