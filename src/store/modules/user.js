import {getUserList,userCount} from '../../request/user'
export default{
    namespaced:true,
    state:{
        userList:[],
        userCount:0,
    },
    getters:{

    },
    mutations:{
        setUserList(state,list){
            state.userList=list;
        },
        setUserCount(state,data){
            state.userCount=data;
        },
    },
    actions:{
        getUserListAction({commit},params){
            getUserList(params).then((res)=>{
                if(res.code===200){
                    commit('setUserList',res.list);
                    // console.log(res.list);
                }else{
                    console.log(res);
                } 
            })
            userCount().then(res=>{
                if(res.code===200){
                    // console.log(res);
                    commit('setUserCount',res.list[0].total);
                }else{
                    console.log(res);
                }
            });
        }
    }
}