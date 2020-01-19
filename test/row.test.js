const expect = chai.expect;
import Vue from 'vue'
import Row from '../src/g-row.vue'
import Col from '../src/g-col.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
    it('存在.', () => {
        expect(Row).to.be.ok
        //expect(Button).to.exist 断言Button是存在的
        //expect([1,2]).to.deep.eq([1,2]) 深入查找
    })

    it('接受 gutter 属性.',(done)=>{
        Vue.component('g-row',Row)
        Vue.component('g-col',Col)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML=`
            <g-row gutter="20">
                <g-col span="12"></g-col>
                <g-col span="12"></g-col>
            </g-row>
        `
        const vm = new Vue({
            el:div
        })
        setTimeout(()=>{
            const cols = vm.$el.querySelectorAll('.g-row')
            expect(getComputedStyle(cols[0]).marginLeft).to.eq('-10px')
            done()
        })
    })
})

describe('Col', () => {
    it('存在.', () => {
        expect(Col).to.be.ok
        //expect(Button).to.exist 断言Button是存在的
        //expect([1,2]).to.deep.eq([1,2]) 深入查找
    })

    it('接受 span 属性.',()=>{
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData:{
                span:1
            }
        }).$mount(div)
        const element = vm.$el
        expect(vm.$el.classList.contains('col-1')).to.eq(true)
        div.remove()
        vm.$destroy()
    })
})
