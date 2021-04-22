import axios from '../utils/http'

//商品规格列表的请求
export function getSpecsList(params){
    let res = axios.get('/specslist',{params:params});
    return res;
}

//添加商品规格的请求
export function addSpecs(data){
    let res=axios.post('/specsadd',data);
    return res;
}

//删除商品规格的请求
export function delSpecs(id){
    let res=axios.post('/specsdelete',{id});
    return res;
}

//编辑商品规格的请求
export function editSpecs(data){
    let res=axios.post('/specsedit',data);
    return res;
}

//商品规格的总数请求
export function specsCount(){
    let res=axios.get('/specscount');
    return res;
}
