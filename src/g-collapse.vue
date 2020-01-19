<template>
    <div class="collapse">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    export default{
        name: 'Gulucollapse',
        props:{
            single:{
                type:Boolean,
                default:false,
            },
            selected:{
                type:Array,
            }
        },
        data(){
            return{
                eventBus:new Vue(),
            }
        },
        provide(){
            return {
                eventBus:this.eventBus
            }
        },
        mounted(){
            this.eventBus.$emit('update:selected',this.selected)
            this.eventBus.$on('update:addSelected',(name)=>{
                let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                if(this.single){
                    selectedCopy = [name]
                }else{
                    selectedCopy.push(name)
                }
                this.$emit('update:selected',selectedCopy)
                this.eventBus.$emit('update:selected',selectedCopy)
            })

            this.eventBus.$on('update:removeSelected',(name)=>{
                let index = this.selected.indexOf(name)
                let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                selectedCopy.splice(index,1)
                this.$emit('update:selected',selectedCopy)
                this.eventBus.$emit('update:selected',selectedCopy)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .collapse{
        border:1px solid #dddddd;
        border-radius: 3px;
    }
</style>