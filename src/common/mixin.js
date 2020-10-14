import {debounce} from 'common/utils'
export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null
    }    
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,300)
    this.itemImgListener=()=>{
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}

import BackTop from 'components/content/backTop/BackTop'
export const tabControlMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop:false
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}