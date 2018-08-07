import axios from 'axios';
import { message } from 'antd';


const service=axios.create({
    baseURL:process.env.NODE_ENV==='development'?'https://api.douban.com':'http://192.168.1.1',//api base_url
    timeout:20000
})

//request interceptor

service.interceptors.request.use(config=>{
    //Do something before request is sent
    if(!permission.check(config)){
        throw '403'
    }
    loading.show(config)
    let token=getToken()
    if(token){
        config.headers['Authorization']='Bearer'+token // 让每个请求携带token -- ['X-Token'] 为自定义key 请根据实际情况自行修改
    }
    return config
},error=>{
    Promise.reject(error);
}

)

// respone intercaptor 

service.interceptors.response.use(
    response=>{
        loading.hide(response.config);
        const res=response.data;
        if(res.statusCode!==200){
            message.error(res.msg);
            return Promise.reject(res.msg);
        }else{
            return response.data;
        }
    },
    error=>{
        loading.hide(error.config)
        if(error.response&&error.response.status===401){
            removveToken();
            if(error.config.url.indexOf('logout')===-1){
                    message.error('登录信息已过期，请重新登录！')
            }
            setTimeout(()=>{
                history.push('/login')
            },1000)
        }else if(error.response&&error.response.status===500){
                message.error('系统错误！')
        }else if(error.message&&error.message.indexOf('timeout')>-1){
            message.error('网络超时！');
        }else if(error==='403'){
            message.error('没有请求权限！')
        }else{
            message.error('网络错误')
        }
        return Promise.reject(error)
    }
)

export default sevice;