<template>
  <div id="detail">
      <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"/>
      <scroll ref="scroll" 
        class="content" 
        @scroll="contentScroll"
        :probe-type="3">
        <detail-swiper ref="base" :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommend" :goods="recommends"/>               
      </scroll>
      <detail-bottom-bar @addToCart="addToCart"/>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
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
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
  import {itemListenerMixin,tabControlMixin} from 'common/mixin'
  import {debounce} from 'common/utils'

  import { mapActions } from 'vuex'
  
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
        DetailBottomBar,
        Scroll,
        GoodsList
    },
    mixins:[itemListenerMixin,tabControlMixin],
    data(){
        return {
            id:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTops: [],
            getThemeTopY:null,
            currentIndex: 0
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
            // 问题：在哪里才能获取到正确的offsetTop
            // 1.created肯定不行，不能获取元素
            // 2.mounted也不行，数据还没获取到
            // 3.获取到数据的回调中也不行，DOM还没渲染完
            // 4.$nextTick也不行，图片没有加载完

            // this.$nextTick(()=>{
            //   this.themeTops = []
            //   this.themeTops.push(this.$refs.base.$el.offsetTop)
            //   this.themeTops.push(this.$refs.param.$el.offsetTop)
            //   this.themeTops.push(this.$refs.comment.$el.offsetTop)
            //   this.themeTops.push(this.$refs.recommend.$el.offsetTop)
            //   console.log(this.themeTops)
            // })            
        })
        getRecommend().then(res=>{
          this.recommends=res.data.list
        })

        this.getThemeTopY = debounce(()=>{
          this.themeTops = []
          this.themeTops.push(this.$refs.base.$el.offsetTop-44)
          this.themeTops.push(this.$refs.param.$el.offsetTop-44)
          this.themeTops.push(this.$refs.comment.$el.offsetTop-44)
          this.themeTops.push(this.$refs.recommend.$el.offsetTop-44)
          this.themeTops.push(Number.MAX_VALUE)
        },300)
    },
    mounted(){
    },
    updated(){      
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){        
        this.$refs.scroll.refresh()        
        this.getThemeTopY()        
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100)
      },
      contentScroll(position){
        this._listenScrollTheme(-position.y)
        this.isShowBackTop = -position.y > 1000
      },
      _listenScrollTheme(position){
        let length = this.themeTops.length;
        for (let i = 0; i < length; i++){
          let iPos = this.themeTops[i];
          if (position >= iPos && position < this.themeTops[i+1]){
            if(this.currentIndex !== i){
              this.currentIndex = i
              this.$refs.nav.currentIndex=this.currentIndex
              break
            }              
          }
        }
      },
      addToCart(){
        const obj = {}
        obj.iid = this.id
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc
        obj.newPrice = this.goods.realPrice
        this.addCart(obj).then(res=>{
           this.$toast.show(res)  
        })
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