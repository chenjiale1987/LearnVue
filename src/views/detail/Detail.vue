<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav"/>
      <scroll ref="scroll" class="content">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" :imageLoad="imageLoad"/>
        <detail-param-info :param-info="paramInfo"/>
        <detail-comment-info :comment-info="commentInfo"/>
        <goods-list :goods="recommends"/>
      </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'  
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
  import {itemListenerMixin} from 'common/mixin'
  
  export default {
    name: "Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        Scroll,
        GoodsList
    },
    mixins:[itemListenerMixin],
    data(){
        return {
            id:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[]
        }
    },
    created(){
        this.id=this.$route.params.iid
        getDetail(this.id).then(res=>{
            console.log(res)
            const data=res.result;            
            //获取图片轮播数据
            this.topImages=data.itemInfo.topImages;
            //获取商品信息
            this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            //获取店铺信息
            this.shop=new Shop(data.shopInfo)
            //获取商品详情
            this.detailInfo=data.detailInfo
            //获取商品参数信息
            this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
            //获取评论信息
            if(data.rate.cRate !== 0){
              this.commentInfo=data.rate.list[0]
            }            
        })
        getRecommend().then(res=>{
          this.recommends=res.data.list
        })
    },
    mounted(){
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.itemImgListener)
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