const actions = {
    //loading
    LOADING({commit},isShow){
        commit('showLoading',{isShow})
    },
    //显示Toast弹窗
    SETTOAST({commit},toast){
        commit('setToast',{toast})
    },
    //关闭Toast弹窗
    CLOSETOAST({commit}){
        commit('closeToast')
    },
    GETTOKEN({commit},token){
        commit('setToken',{token})
    },
}

export default actions