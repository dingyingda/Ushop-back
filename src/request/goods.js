import axios from '../utils/http'

//商品规格列表的请求
export function getGoodsList(params){
    let res = axios.get('/goodslist',{params:params});
    return res;
}

//添加商品规格的请求
export function addGoods(data){
    let res=axios.post('/goodsadd',data);
    return res;
}

//删除商品规格的请求
export function delGoods(id){
    let res=axios.post('/goodsdelete',{id});
    return res;
}

//编辑商品规格的请求
export function editGoods(data){
    let res=axios.post('/goodsedit',data);
    return res;
}

//商品规格的总数请求
export function goodsCount(){
    let res=axios.get('/goodscount');
    return res;
}
