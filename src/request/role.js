import axios from '../utils/http'

//角色列表的请求
export function getRoleList(){
    let res = axios.get('/rolelist');
    return res;
}

//添加角色的请求
export function addRole(data){
    let res=axios.post('/roleadd',data);
    return res;
}

//删除角色的请求
export function delRole(id){
    let res=axios.post('/roledelete',{id});
    return res;
}

//编辑角色的请求
export function editRole(data){
    let res=axios.post('/roleedit',data);
    return res;
}