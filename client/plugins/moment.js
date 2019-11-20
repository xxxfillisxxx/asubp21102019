import moment from 'moment'
import Vue from 'vue'

const MomentPlugin = {
    install(Vue, options) {
        Vue.prototype.$moment = moment
    }
}

Vue.use(MomentPlugin)

