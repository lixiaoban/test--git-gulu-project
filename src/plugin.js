import Toast from './g-toast.vue'

let currentToast
export default {
    install(Vue,options){
        Vue.prototype.$toast = function(message,ToastOptions){
            //console.log('I am Toast')

            console.log(currentToast)
            if(currentToast){
                currentToast.close()
            }
            currentToast = createToast(Vue,message,ToastOptions)

        }
    }
}

function createToast(Vue,message,ToastOptions){
    "use strict";
    let Constructor = Vue.extend(Toast)
    //console.log(ToastOptions.closeButton)
    let toast = new Constructor({
        propsData:{
            position:ToastOptions.position,
            closeButton:ToastOptions.closeButton
        }
    })
    toast.$slots.default = [message]
    toast.$mount()
    document.body.appendChild(toast.$el)
    return toast
}