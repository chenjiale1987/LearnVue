import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
      cartList:[]
    },
    mutations:{
      addCart(state,payload){
        const oldInfo = state.cartList.find(item => item.iid === payload.iid)
        if (oldInfo) {
          oldInfo.count += 1
        }else{
          payload.count = 1
          state.cartList.push(payload) 
        }           
      }
    }
})

export default store