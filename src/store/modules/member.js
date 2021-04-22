import {getMemberList,getMemberInfo} from '../../request/member'
export default{
    namespaced:true,
    state:{
        memberList:[],
    },
    getters:{},
    mutations:{
        setMemberList(state,list){
            state.memberList=list;
        },
    },
    actions:{
        getMemberListAction({commit}){
            getMemberList().then((res)=>{
                if(res.code===200){
                    // console.log(res.list);
                    commit('setMemberList',res.list);
                }else{
                    console.log(res);
                }
            });
        },
    }
}