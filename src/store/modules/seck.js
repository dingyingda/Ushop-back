import {getSeckList} from '../../request/seck'
export default{
    namespaced:true,
    state:{
        seckList:[],
    },
    getters:{},
    mutations:{
        setSeckList(state,list){
            state.seckList=list;
        },
    },
    actions:{
        getSeckListAction({commit}){
            getSeckList().then((res)=>{
                if(res.code===200){
                    // console.log(res.list);
                    commit('setSeckList',res.list);
                }else{
                    console.log(res);
                }
            });
        },
    }
}