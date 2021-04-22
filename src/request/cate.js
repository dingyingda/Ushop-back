import axios from '../utils/http'

//商品分类列表的请求
export function getCateList(){
    let res = axios.get('/catelist?istree=1');
    return res;
}

//添加菜单的请求
export function addCate(data){
    let res=axios.post('/cateadd',data);
    return res;
}

//删除菜单的请求
export function delCate(id){
    let res=axios.post('/catedelete',{id});
    return res;
}

//编辑菜单的请求
export function editCate(data){
    let res=axios.post('/cateedit',data);
    return res;
}
