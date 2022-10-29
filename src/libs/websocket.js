import Vue from 'vue'

function testFunc() {
    return "test val"
}

Vue.prototype.$testFunc = testFunc
