import {request} from './request'
const baseURL='http://152.136.185.210:8000/api/w6'
export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    },baseURL)
}

export function getHomeGoods(type, page){
    return request({
        url: '/home/data',
        params: {
        type,
        page
        }
    },baseURL)
}