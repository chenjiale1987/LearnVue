<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav"/>
      <scroll ref="scroll" class="content">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" :imageLoad="imageLoad"/>
      </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import {getDetail,Goods,Shop} from 'network/detail'
  import {debounce} from 'common/utils'
  
  export default {
    name: "Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        Scroll
    },
    data(){
        return {
            id:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{}
        }
    },
    created(){
        this.id=this.$route.params.iid
        getDetail(this.id).then(res=>{
            console.log(res)
            const data=res.result;            
            this.topImages=data.itemInfo.topImages;
            this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            this.shop=new Shop(data.shopInfo)
            this.detailInfo=data.detailInfo
        })
    },
    mounted(){
      this.$bus.$on('itemImageLoad',()=>{
        this.$refs.scroll.refresh()
      })
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }
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