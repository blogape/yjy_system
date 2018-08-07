import axios from "axios";
// 当使用表单形式提交的时候 谨慎使用！！！可能会导致其余地方发生变化
import qs from "qs";
// import 're6-promise'
axios.defaults.baseURL = "https://api.douban.com";

// get 请求
// console.log(Promise);
export function get(url, params) {
  axios
    .get(url, {
      params: params
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}

const get = (url, params) => axios.get(url, { params }).then(res => res.data);

// post 请求
export function post(url, data) {
  axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}
