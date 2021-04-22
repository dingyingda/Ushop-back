import axios from '../utils/http'

//管理员登录  data代表请求体
export function userLogin(data){
    let res=axios.post('/userlogin',data);
    return res;
}

//会员列表的请求
export function getUserList(params){
    let res = axios.get('/userlist',{
        params:{
            page:params.page,
            size:params.size
        }
    });
    return res;
}

//添加会员的请求
export function addUser(data){
    let res=axios.post('/useradd',data);
    return res;
}

//删除会员的请求
export function delUser(uid){
    let res=axios.post('/userdelete',{uid});
    return res;
}

//编辑会员的请求
export function editUser(data){
    let res=axios.post('/useredit',data);
    return res;
}

//获取会员总数
export function userCount(){
    let res=axios.get('/usercount');
    return res;
}