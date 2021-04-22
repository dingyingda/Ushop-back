import {getMenuList} from '../../request/menu'
export default{
    namespaced:true,
    state:{
        menuList:[],
    },
    getters:{

    },
    mutations:{
        setMenuList(state,list){
            state.menuList=list;
        },
    },
    actions:{
        getMenuListAction({commit}){
            getMenuList().then((res)=>{
                if(res.code===200){
                    commit('setMenuList',res.list);
                    // console.log(res.list);
                }else{
                    console.log(res);
                } 
            })
        }
    }
}