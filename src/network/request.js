import axios from 'axios'

export function request(config,baseURL){
    const instance = axios.create({
        baseURL : baseURL,
        timeout : 1000000
    })

    instance.interceptors.request.use(config=>{
        return config
    },err => {
        console.log(err);
    })

    instance.interceptors.response.use(res=>{
        return res.data
    },err => {
        console.log(err)
    })

    return instance(config)
}