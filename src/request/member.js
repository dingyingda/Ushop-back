import axios from '../utils/http'

//角色列表的请求
export function getMemberList(){
    let res = axios.get('/memberlist');
    return res;
}

//添加角色的请求
export function addMember(data){
    let res=axios.post('/memberadd',data);
    return res;
}

//删除角色的请求
export function delMember(id){
    let res=axios.post('/memberdelete',{id});
    return res;
}

//编辑角色的请求
export function editMember(data){
    let res=axios.post('/memberedit',data);
    return res;
}