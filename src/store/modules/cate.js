import {getCateList} from '../../request/cate'
export default{
    namespaced:true,
    state:{
        cateList:[],
    },
    getters:{

    },
    mutations:{
        setCateList(state,list){
            state.cateList=list;
        },
    },
    actions:{
        getCateListAction({commit}){
            getCateList().then((res)=>{
                if(res.code===200){
                    commit('setCateList',res.list);
                    // console.log(res.list);
                }else{
                    console.log(res);
                } 
            })
        }
    }
}