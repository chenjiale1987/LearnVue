<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav"/>
      <scroll ref="scroll" class="content">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
      </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import {getDetail,Goods,Shop} from 'network/detail'
  import {debounce} from 'common/utils'
  
  export default {
    name: "Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll
    },
    data(){
        return {
            id:null,
            topImages:[],
            goods:{},
            shop:{}
        }
    },
    created(){
        this.id=this.$route.params.iid
        getDetail(this.id).then(res=>{
            const data=res.result;
            this.topImages=data.itemInfo.topImages;
            this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            this.shop=new Shop(data.shopInfo)
        })
    },
    mounted(){
      const refresh = debounce(this.$refs.scroll.refresh,300)
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      })
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height:100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height:calc(100% - 44px)    
  }  
</style>