import axios from '../utils/http'

//菜单列表的请求
export function getMenuList(){
    let res = axios.get('/menulist?istree=1');
    return res;
}

//添加菜单的请求
export function addMenu(data){
    let res=axios.post('/menuadd',data);
    return res;
}

//删除菜单的请求
export function delMenu(id){
    let res=axios.post('/menudelete',{id});
    return res;
}

//编辑菜单的请求
export function editMenu(data){
    let res=axios.post('/menuedit',data);
    return res;
}