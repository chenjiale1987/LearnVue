<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" 
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"/>
      <good-list :goods="showGoods"/>               
    </scroll>
    <!-- @click.native 组件点击 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop:false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list       
      },
    },
    created(){
      //请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      //局部变量被引用时不会销毁
      const refresh = this.debounce(this.$refs.scroll.refresh,300)
      this.$bus.$on('itemImageLoad',()=>{
        // this.$refs.scroll.refresh()
        refresh()
      })
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      debounce(func,delay){
        //局部变量被引用时不会销毁
        let timer = null
        return (...args) => {
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,args)
          }, delay)
        }
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },    
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position){
        // console.log(position)
        this.isShowBackTop = -position.y > 1000
      },
      loadMore(){
        // console.log('上啦加载更多') 
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  /* #home{ */
    /* padding-top:44px; */
    /* height: 100vh; */
    /* position: relative; */
  /* } */
  .home-nav {
    background-color: var(--color-tint);
    color:#fff;
    position:fixed;
    left:0;
    right:0;
    top:0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {    
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>