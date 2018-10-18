const mutations = {
    //打开弹窗
    setToast(state,{toast}){
        state.toast = toast
        state.showToast = true
    },
    //关闭弹窗
    closeToast(state){
        state.showToast = false
    },
    //显示loading图
    showLoading(state,{isShow}){
        state.showLoading = isShow
    },
    //保存token
    setToken(state,{token}){
        state.token = token
    },
}

export default mutations