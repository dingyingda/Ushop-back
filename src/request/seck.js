import axios from '../utils/http'

//角色列表的请求
export function getSeckList(){
    let res = axios.get('/secklist');
    return res;
}

//添加角色的请求
export function addSeck(data){
    let res=axios.post('/seckadd',data);
    return res;
}

//删除角色的请求
export function delSeck(id){
    let res=axios.post('/seckdelete',{id});
    return res;
}

//编辑角色的请求
export function editSeck(data){
    let res=axios.post('/seckedit',data);
    return res;
}