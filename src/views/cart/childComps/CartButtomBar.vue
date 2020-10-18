<template>
  <div class="buttom-bar">
      <div class="check-content">
          <check-button :is-checked="isSelectAll" 
          class="check-button"
          @click.native="checkClick"/>
          <span>全选</span>
      </div>    
      <div class="price">
          合计:{{totalPrice}}
      </div>  
      <div class="calculate" @click="calcClick">
          去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import { mapGetters } from 'vuex'
  export default {
    name: "CartButtomBar",
    components:{
       CheckButton 
    },
    computed:{
        ...mapGetters(['cartList']),
        totalPrice(){
            return '¥' + this.cartList
            .filter(item => item.checked)            
            .reduce((preValue,item)=>{
                return preValue + item.newPrice*item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.cartList.filter(item=>item.checked).length
        },
        isSelectAll(){
          if(this.cartList.length==0)
            return false
          return !this.cartList.find(item=>!item.checked)
        }
    },
    methods:{
        checkClick(){
            if(this.isSelectAll){
                this.cartList.forEach(item=>item.checked=false)
            }else{
                this.cartList.forEach(item=>item.checked=true)
            }
        },
        calcClick(){
            if(!this.checkLength){
                this.$toast.show('请选择要购买的商品')
            }
        }
    }
  }
</script>

<style scoped>
  .buttom-bar{
    position: relative;
    display: flex;
    height: 40px;      
    line-height: 40px;
    background-color: #eee;
    font-size:14px;
  }
  .check-content{
      display: flex;
      align-items: center;
      margin-left: 10px;      
      width:60px;
  }
  .check-button{
      width:20px;
      height:20px;
      line-height: 20px;
      margin-right: 5px;
  }
  .price{
      margin-left:20px;
      flex:1;
  }
  .calculate{
      width: 90px;
      background-color: red;
      color:#fff;
      text-align: center;
  }
</style>