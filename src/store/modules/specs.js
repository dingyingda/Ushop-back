import {getSpecsList,specsCount} from '../../request/specs'
export default{
    namespaced:true,
    state:{
        specsList:[],
        specsCount:0,
    },
    getters:{},
    mutations:{
        setSpecsList(state,list){
            state.specsList=list;
        },
        setSpecsCount(state,data){
            state.specsCount=data;
        },
    },
    actions:{
        getSpecsListAction({commit},params){
            getSpecsList(params).then(res=>{
                if(res.code===200){
                    commit('setSpecsList',res.list);
                }else{
                    console.log(res);
                }
            });
            specsCount().then(res=>{
                if(res.code===200){
                    commit('setSpecsCount',res.list[0].total);
                }else{
                    console.log(res);
                }
            });
        }
    }
}