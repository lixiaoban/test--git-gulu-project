<template>
    <div class="cascader" ref="cascader" v-click-outside="close">
        <div class="trigger" @click="toggle">
            {{result}}
        </div>
        <div v-if="popoverVisible" class="popover-wrapper">
            <g-cascader-item :items="source" :height="wrapHeight"
                             :selected="selected"
                             :load-data="loadData"
                             :loading-item="loadingItem"
                             @update:selected="onUpdateSelected">

            </g-cascader-item>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import CascaderItem from './g-cascader-item.vue'
    import ClickOutside from './click-outside'
    export default{
        name:'GuluCascader',
        component:{CascaderItem},
        directives:{ClickOutside},
        props:{
            source:{
                type:Array
            },
            wrapHeight:{
                type:String
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
                popoverVisible:false,
                loadingItem:{}
            }
        },
        methods:{
//            onClickDocument(e){
//                console.log('123')
//                let {cascader} = this.$refs
//                let {target} = e
//                if(cascader == target || cascader.contains(target)){return}
//                this.close()
//            },
            open(){
                this.popoverVisible = true
//                this.$nextTick(()=>{
//                    document.addEventListener('click',this.onClickDocument)
//                })
            },
            close(){
                this.popoverVisible = false
//                document.removeEventListener('click',this.onClickDocument)
            },
            toggle(){
                if(this.popoverVisible == true){
                    this.close()
                }else{
                    this.open()
                }
//                this.popoverVisible = !this.popoverVisible
            },
            onUpdateSelected(newSelected){
                this.$emit('update:selected',newSelected)
//                debugger
                let lastItem = newSelected[newSelected.length-1]
                let simplest = (children,id)=>{
                    return children.filter(item=> item.id == id)[0]
                }

                let complex = (children,id)=>{
                    let noChildren = []
                    let hasChildren = []

                    children.forEach(item=>{
                        if(item.children){
                            hasChildren.push(item)
                            //console.log(hasChildren)
                        }else{
                            noChildren.push(item)
                            //console.log(noChildren)
                        }
                    })

                    let found = simplest(noChildren,id)
                    if(found){
                        return found
                    }else{
                        found = simplest(hasChildren,id)
                        if(found){
                            return found
                        }else{
                            for(let i = 0;i<hasChildren.length;i++){
                                found = complex(hasChildren[i].children,id)
                                if(found){
                                    return found
                                }
                            }
                            return undefined
                        }
                    }
                }

                let updateSource = (result)=>{
                    this.loadingItem = {}
                    //单向数据流禁止这样书写
                    //this.$set(lastItem,'children',result)
                    //console.log(result)
                    //console.log(this.source)
                    //let toUpdate = this.source.filter(item => item.id === lastItem.id)[0]
                    let copy = JSON.parse(JSON.stringify(this.source))
                    let toUpdate = complex(copy,lastItem.id)
                    this.$set(toUpdate,'children',result)
                    this.$emit('update:source',copy)
                }
//                console.log(lastItem)
                if(!lastItem.isLeaf && this.loadData){
                     this.loadData(lastItem,updateSource)
                     this.loadingItem = lastItem
                }
            }
        },
        computed:{
            result(){
                return this.selected.map((item)=> item.name).join(` / `)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "var.scss";
    .cascader{
        display: inline-block;
        position: relative;
        height:32px;
        .trigger{
            background: white;
            height: $height;
            display: inline-flex;
            align-items: center;
            padding: 0.2em 0.5em;
            min-width:10em;
            border:1px solid #dddddd;
            border-radius: 3px;
            color:#424242;
        }
        .popover-wrapper{
            position: absolute;
            top:100%;
            left:0;
            background: white;
            display: flex;
            z-index:1;
            @extend .box-shadow;
        }
    }
</style>