export default {
  addCart(context,payload){
    const oldInfo = context.state.cartList.find(item => item.iid === payload.iid)
    if (oldInfo) {
        context.commit('addCounter',oldInfo)
    }else{
        payload.count = 1
        payload.checked = true
        context.commit('addToCart',payload)
    }           
  }
}