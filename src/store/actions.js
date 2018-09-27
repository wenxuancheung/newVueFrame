const actions = {
    showLoading({ commit }, boo) {
        commit('showLoading', boo)
    },
    changeToken({ commit }, token) {
        commit('changeToken', token)
    },
    showApplyResult({ commit }, boo) {
        commit('showApplyResult', boo)
    },
    checkRealNameAuth({ commit }, res) {
        commit('checkRealNameAuth', res)
    },
}

export default actions