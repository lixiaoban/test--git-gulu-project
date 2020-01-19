<template>
    <div class="toastContain" :class="positionStyle" ref="wrapper">
        <div class="toast">
            <div class="toastWrap">
                <div v-if="closeButton.enableHtml" v-html="$slots.default[0]"></div>
                <slot v-else></slot>
            </div>
            <div class="toastLine" ref="line"></div>
            <div class="toastClose" v-if="closeButton" @click="closeBtn">
                {{closeButton.text}}
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name:'GuluToast',
        props:{
            autoClose:{
                type:Boolean,
                default:true
            },
            autoCloseDelay:{
                type:Number,
                default:3000000
            },
            position:{
                type:String,
                default:'top',
                validator(value){
//                    console.log(value)
                    return ['top','center','bottom'].includes(value)
//                    return ['left','center','right'].indexOf(value)>=0
                }
            },
            closeButton:{
                type:Object,
                default (){
                    return {
                        text:'关闭22',
                        enableHtml:false,
                        callback: undefined
                    }
                }
            }
        },
        created(){
//            console.log(this.closeButton)
//            console.log(typeof this.closeButton.callback==='function')
        },
        mounted(){

            if(this.autoClose){
                setTimeout(()=>{
                    this.close()
                },this.autoCloseDelay)
            }

            this.$nextTick(()=>{
                this.$refs.line.style.height=
                    `${this.$refs.wrapper.getBoundingClientRect().height}px`
            })
        },
        computed:{
            positionStyle(){
                let {position} = this
                return [position&&`position-${position}`]
            }
        },
        methods:{
            close(){
                this.$el.remove()
                this.$destroy
            },
            log(){
                console.log('11111')
            },
            closeBtn(){
                this.close()

                if(this.closeButton && typeof this.closeButton.callback==='function'){
                    this.closeButton.callback(this)
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    @keyframes slide-up {
        0% {opacity: 0;transform: translateY(100%)}
        100% {opacity: 1;transform: translateY(0%)}
    }
    @keyframes slide-down {
        0% {opacity: 0;transform: translateY(-100%)}
        100% {opacity: 1;transform: translateY(0%)}
    }
    @keyframes slide-in {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
    .toastContain{
        /*animation-delay: 500ms;*/
        position: fixed;
        left:50%;
        transform: translateX(-50%);
        $delay:500ms;
        &.position-top{
            top:10px;
            .toast{
                animation: slide-down $delay;
            }
        }
        &.position-center{
            top:50%;
            .toast{
                animation: slide-in $delay;
            }
        }
        &.position-bottom{
            bottom:10px;
            .toast {
                 animation: slide-up $delay;
            }
        }
        .toast{
            max-width:300px;
            min-height:3em;
            display: flex;padding:0 10px;
            justify-content: space-around;
            align-items: center;
            background-color: #3c8cff;
            color: #fff1f0;
            font-size: 14px;
            box-shadow: 0px 1px 9px 0px #5e6a7a40;
            border-radius: 4px;

            .toastWrap{
                margin-right:16px;
                padding:5px 0;
            }
            .toastLine{
                width:1px;
                height:100%;
                background-color: #fff;
                /*margin:0 10px;*/
                /*position: absolute;*/
                /*right:76px;*/
            }
            .toastClose{
                position: relative;
                margin-left:16px;
                display: flex;
                align-items: center;
                width:50px;
                min-height:3em;
                cursor: pointer;
                /*文字不换行*/
                flex-shrink: 0;
            }
        }
    }

</style>