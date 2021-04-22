import {getRoleList,getRoleInfo} from '../../request/role'
export default{
    namespaced:true,
    state:{
        roleList:[],
    },
    getters:{},
    mutations:{
        setRoleList(state,list){
            state.roleList=list;
        },
    },
    actions:{
        getRoleListAction({commit}){
            getRoleList().then((res)=>{
                if(res.code===200){
                    // console.log(res.list);
                    commit('setRoleList',res.list);
                }else{
                    console.log(res);
                }
            });
        },
    }
}