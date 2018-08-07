import {get,post} from './http.js';


// 测试请求豆瓣接口
export function doubanbook(){
    const result=get('/v2/book/1220562')
    return result;
}