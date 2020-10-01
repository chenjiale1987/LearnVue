import {request} from './request'
const baseURL='http://152.136.185.210:8000/api/w6'
export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    },baseURL)
}

export class Goods{
    constructor(itemInfo,columns,services){
        this.title=itemInfo.title
        this.desc=itemInfo.desc
        this.newPrice=itemInfo.price
        this.oldPrice=itemInfo.oldPrice
        this.discount=itemInfo.discountDesc
        this.columns=columns
        this.services=services
        this.realPrice=itemInfo.lowNowPrice
    }
}