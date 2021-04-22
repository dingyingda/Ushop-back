import {getBannerList,getBannerInfo} from '../../request/banner'
export default{
    namespaced:true,
    state:{
        bannerList:[],
    },
    getters:{},
    mutations:{
        setBannerList(state,list){
            state.bannerList=list;
        },
    },
    actions:{
        getBannerListAction({commit}){
            getBannerList().then((res)=>{
                if(res.code===200){
                    // console.log(res.list);
                    commit('setBannerList',res.list);
                }else{
                    console.log(res);
                }
            });
        },
    }
}