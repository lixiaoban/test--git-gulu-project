<template>
    <div>
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    export default {
        name:'GuluTab',
        props:{
            selected:{
                type:String|Number,
                required:true
            },
            direction:{
                type:String,
                default:'horizontal',
                validator(value){
                    return ['horizontal','vertical'].indexOf(value)>=0
                }
            }
        },
        data(){
            return {
                eventBus: new Vue()
            }
        },
        provide(){
            return {
                eventBus:this.eventBus
            }
        },
        created(){
            //this.$emit('update:selected','xxx')
        },
        mounted(){
            this.$children.forEach((vm)=>{
                if(vm.$options.name === 'GuluTabHeader'){
                    vm.$children.forEach((vm2)=>{
//                        console.log(this.selected)
                        if(vm2.$options.name === 'GuluTabItem' && vm2.name === this.selected){
                            this.eventBus.$emit('update:selected',this.selected,vm2)
                        }
                    })
                }
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>