<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{cartLength}})
      </div>
    </nav-bar>
    <cart-list/>
    <cart-buttom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'  
  import CartButtomBar from './childComps/CartButtomBar'
  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartButtomBar
    },
    computed:{
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart{
     height:100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>