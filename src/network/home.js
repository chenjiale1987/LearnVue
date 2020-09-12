import {request} from './request'
export function getHomeMultidata(){
    const baseURL1='http://123.207.32.32:8000'
    return request({
        url:'/home/multidata'
    },baseURL1)
}

export function getHomeGoods(type, page){
    const baseURL1='http://localhost:2018'
    return request({
        url: '/home/data',
        params: {
        type,
        page
        }
    },baseURL1)
}