<template>
  <div id="detail">
      <detail-nav-bar/>
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import {getDetail,Goods,Shop} from 'network/detail'
  
  export default {
    name: "Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo
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

    }
  }
</script>

<style scoped>
  
</style>