const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/g-input.vue'

describe('Input',()=>{
    "use strict";
    it('存在.', ()=>{
        expect(Input).to.be.ok
    })

    describe('props',()=>{
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(()=>{
            vm.$destroy()
        })
        it('可以设置属性disabled.',()=>{
            vm = new Constructor({
                propsData:{
                    disabled:true
                }
            }).$mount()
            let inputElement = vm.$el.querySelector('input')
            expect(inputElement.disabled).to.equal(true)
        })
    })

    describe('event',()=>{
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(()=>{
            vm.$destroy()
        })

        it('可以设置change事件.',()=>{
            vm = new Constructor({}).$mount()
            const callback = sinon.fake()
            vm.$on('change', callback)
            let event = new Event('change')
            Object.defineProperty(
                event,'target',{
                    value:{value:'hi'},enumerable:true
                }
            )
            let inputElement = vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith('hi')
            //vm.$el.onchange()
            //expect(callback).to.have.been.called
        })

        it('可以设置focus事件.',()=>{
            vm = new Constructor({}).$mount()
            const callback = sinon.fake()
            vm.$on('focus', callback)
            let event = new Event('focus')
            Object.defineProperty(
                event,'target',{
                    value:{value:'hi'},enumerable:true
                }
            )
            let inputElement = vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith('hi')
            //vm.$el.focus()
            //expect(callback).to.have.been.called
        })
    })
})

