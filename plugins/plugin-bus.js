// plugin-bus.js
import Vue from 'vue' // 或者使用mitt

export default (_, inject) => {
  inject('bus', new Vue())
}
