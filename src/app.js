import Vue from 'vue'
import Button from './g-button.vue'
import Icon from './g-icon.vue'
import ButtonGrounp from './g-button-grounp.vue'
import Input from './g-input.vue'
import Col from './g-col.vue'
import Row from './g-row.vue'
import Toast from './g-toast.vue'
import Plugin from './plugin'
//tab主件群
import Tab from './g-tab.vue'
import TabHeader from './g-tab-header.vue'
import TabBody from './g-tab-body.vue'
import TabItem from './g-tab-item.vue'
import TabPane from './g-tab-pane.vue'
//popover组件
import Popover from './g-popover.vue'
//collapse组件
import Collapse from './g-collapse.vue'
import CollapseItem from './g-collapse-item.vue'
//cascader组件
import Cascader from './g-cascader.vue'
import CascaderItem from './g-cascader-item.vue'
import db from './db.js'

Vue.component('g-button',Button)
Vue.component('g-icon',Icon)
Vue.component('g-button-grounp',ButtonGrounp)
Vue.component('g-input',Input)
Vue.component('g-row',Row)
Vue.component('g-col',Col)
Vue.use(Plugin)
//tab组件群
Vue.component('g-tab',Tab)
Vue.component('g-tab-header',TabHeader)
Vue.component('g-tab-body',TabBody)
Vue.component('g-tab-item',TabItem)
Vue.component('g-tab-pane',TabPane)
//popover组件
Vue.component('g-popover',Popover)
//collapse组件
Vue.component('g-collapse',Collapse)
Vue.component('g-collapse-item',CollapseItem)
//cascader组件
Vue.component('g-cascader',Cascader)
Vue.component('g-cascader-item',CascaderItem)

function ajax(parentId = 0){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let result = db.filter((item)=>item.parent_id == parentId)
            result.forEach((node)=>{
                if(db.filter(item => item.parent_id == node.id).length>0){
                    node.isLeaf = false
                }else{
                    node.isLeaf = true
                }
            })
            resolve(result)
        },2000)
    })
}

new Vue({
    el:'#app',
    data:{
        message:'hihi',
        loading1:false,
        loading2:true,
        loading3:false,
        loading4:false,
        inputValue:9,
        selected:[],
        selectedTab:'sports',
        collapseSelected:['1','2'],
        source:[],
        isShow:true,
        isShow2:true,
        isShow3:true,
        view:'v-a',
        items:[1,2,3,4,5,6],
        nextNum:7
    },
    components:{
        'v-a':{
            template:'<div>Component A</div>'
        },
        'v-b':{
            template:'<div>Component B</div>'
        }
    },
    created (){
        ajax(0).then((result)=>{
            this.source = result
        })
    },
    methods:{
        randomIndex: function () {
            return Math.floor(Math.random() * this.items.length)
        },
        add: function () {
            this.items.splice(this.randomIndex(), 0, this.nextNum++)
        },
        remove: function () {
            this.items.splice(this.randomIndex(), 1)
        },
        loadData (item, updateSource){
            let id = item.id
            ajax(id).then(result => {
                updateSource(result)
            })
        },
        //xxx(){
        //    ajax(this.selected[0].id).then(result => {
        //        let lastLevelSelected = this.source.filter(item => item.id === this.selected[0].id)[0]
        //        //一开始没有申明的属性,用$set方法
        //        this.$set(lastLevelSelected,'children',result)
        //    })
        //},
        changeInput(e,...array){
            console.log(e)
            console.log(array)
        },
        onInput(e){
            console.log(e)
        },
        focusInput(e){
            console.log(e)
        },
        blurInput(e){
            console.log(e)
        },
        showToast1(){
           this.showToast('top')
        },
        showToast2(){
            this.showToast('center')
        },
        showToast3(){
            this.showToast('bottom')
        },
        showToast(position){
            //console.log(position)
            this.$toast(`智商:${parseInt(Math.random()*100)}<a href="https://cn.vuejs.org/" >很多多钱多多很多多钱多多很多多钱多多很多多钱多多很多多钱多多很多多钱多多很多多钱多多很多多钱多多很多多钱多多</a>`,{
                position:position,
                closeButton:{
                    text:'我知道用的Vue',
                    enableHtml:true,
                    callback(toast){
                        toast.log()
                    }
                }
            })
        }
    }
})