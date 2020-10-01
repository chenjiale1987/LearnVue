<template>
  <div id="detail">
      <detail-nav-bar/>
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import {getDetail,Goods} from 'network/detail'
  
  export default {
    name: "Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo
    },
    data(){
        return {
            id:null,
            topImages:[],
            goods:{}
        }
    },
    created(){
        this.id=this.$route.params.iid
        getDetail(this.id).then(res=>{
            const data=res.result;
            this.topImages=data.itemInfo.topImages;
            this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        })

    }
  }
</script>

<style scoped>
  
</style>