import axios from '../utils/http'

//角色列表的请求
export function getBannerList(){
    let res = axios.get('/bannerlist');
    return res;
}

//添加角色的请求
export function addBanner(data){
    let res=axios.post('/banneradd',data);
    return res;
}

//删除角色的请求
export function delBanner(id){
    let res=axios.post('/bannerdelete',{id});
    return res;
}

//编辑角色的请求
export function editBanner(data){
    let res=axios.post('/banneredit',data);
    return res;
}