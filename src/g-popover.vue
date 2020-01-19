<template>
    <div class="popover" ref="popover">
        <div ref="contentWrapper" class="contentWrapper" v-if="visible" :class="positionClass">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper" style="display: inline-block">
            <slot></slot>
        </span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        name:'Gulupopover',
        data(){
            return {
                visible:false
            }
        },
        props:{
            position:{
                type:String,
                default:'top',
                validator(value){
                    return ['top','left','right','bottom'].includes(value)
                }
            },
            trigger:{
                type:String,
                default:'click',
                validator(value){
                    return ['click','hover'].indexOf(value)>=0
                }
            }
        },
        created(){
//            console.log('我是第一嘛')
        },
        mounted(){
            if(this.trigger==='click'){
                this.$refs.popover.addEventListener('click',this.onClick)
            }else{
                this.$refs.popover.addEventListener('mouseenter', this.open)
                this.$refs.popover.addEventListener('mouseleave',this.close)
            }
        },
        beforeDestroy(){
            if(this.trigger==='click'){
                this.$refs.popover.removeEventListener('click',this.onClick)
            }else{
                this.$refs.popover.removeEventListener('mouseenter', this.open)
                this.$refs.popover.removeEventListener('mouseleave',this.close)
            }
        },
        computed:{
            positionClass(){
                let {position} = this
                return [position&&`position-${position}`]
            }
        },
        methods:{
            onClickDocument(event){
                if(this.$refs.popover &&
                  (this.$refs.popover === event.target ||
                   this.$refs.popover.contains(event.target))){
                    return
                }
                if(this.$refs.contentWrapper &&
                  (this.$refs.contentWrapper === event.target ||
                   this.$refs.contentWrapper.contains(event.target))){
                    return
                }
                this.close()
            },
            positionContent(){
                const {contentWrapper,triggerWrapper} = this.$refs
                document.body.appendChild(contentWrapper)
                let {width,height,top,left} = triggerWrapper.getBoundingClientRect()
                if(this.position=='top'){
                    contentWrapper.style.left = left + window.scrollX + 'px'
                    contentWrapper.style.top = top + window.scrollY + 'px'
                }else if(this.position=='bottom'){
                    contentWrapper.style.left = left + window.scrollX + 'px'
                    contentWrapper.style.top = top + window.scrollY + height + 'px'
                }else if(this.position=='left'){
                    contentWrapper.style.left = left + window.scrollX + 'px'
                    let {height:height2} = contentWrapper.getBoundingClientRect()
                    contentWrapper.style.top = top + window.scrollY + (height - height2)/2 + 'px'
                }else if(this.position=='right'){
                    contentWrapper.style.left = left + window.scrollX + width + 'px'
                    let {height:height2} = contentWrapper.getBoundingClientRect()
                    contentWrapper.style.top = top + window.scrollY + (height - height2)/2 + 'px'
                }

            },
            open(){
                this.visible = true
                this.$nextTick(() => {
                    this.positionContent()
                    document.addEventListener('click',this.onClickDocument)
                })
            },
            close(){
                this.visible = false
                console.log('结束监听')
                document.removeEventListener('click',this.onClickDocument)
            },
            onClick (event){
                //点的按钮
                if(this.$refs.triggerWrapper.contains(event.target)){
                    if(this.visible === true){
                        this.close()
                    }else{
                        this.open()
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "var.scss";
    .popover{
        display: inline-block;
        position: relative;
    }
    .contentWrapper{
        background: $popoverBg;
        position: absolute;
        border:1px solid #333;
        color: #333;
        filter: drop-shadow(1px 1px 2px black);
        border-radius: 3px;
        padding:.5em 1em;
        word-break: break-all;
        max-width:20em;
        &::before,&::after{
            content:'';
            position: absolute;
        }
        &.position-top{
            margin-top:-10px;
            transform: translateY(-100%);
            &::before{
                 top:100%;
                 left:1em;
                 border:10px solid transparent;
                 border-top-color: #333;
             }
            &::after{
                 top:calc(100% - 1.2px);
                 left:1em;
                 border:10px solid transparent;
                 border-top-color: $popoverBg;
             }
        }
        &.position-bottom{
             margin-top:10px;
            &::before{
                 bottom:100%;
                 left:1em;
                 border:10px solid transparent;
                 border-bottom-color: #333;
             }
            &::after{
                 bottom:calc(100% - 1.2px);
                 left:1em;
                 border:10px solid transparent;
                 border-bottom-color: $popoverBg;
             }
        }
        &.position-left{
             margin-right:10px!important;
            transform: translateX(-100%);
            &::before,&::after{
                transform:translateY(-50%);
                top:50%;
            }
            &::before{
                 left:100%;
                 border:10px solid transparent;
                 border-left-color: #333;
             }
            &::after{
                 left:calc( 100% - 1.2px);
                 border:10px solid transparent;
                 border-left-color: $popoverBg;
             }
        }
        &.position-right{
             margin-right:-10px!important;
            &::before,&::after{
                 transform:translateY(-50%);
                 top:50%;
            }
            &::before{
                 right:100%;
                 border:10px solid transparent;
                 border-right-color: #333;
             }
            &::after{
                 right:calc( 100% - 1.2px);
                 border:10px solid transparent;
                 border-right-color: $popoverBg;
             }
        }
    }

</style>