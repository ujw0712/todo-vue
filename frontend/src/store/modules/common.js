const common = {
    namespaced: true,
    state: {
        isLoading: false,
        isOpenLnb: true,
        isOpenCardDetail: false,
        isOpenChat: false,
    },
    mutations: {
        MUT_SET_LOADING(state, payload) {
            state.isLoading = payload.isLoading
        },
        MUT_TOGGLE_LNB(state) {
            state.isOpenLnb = !state.isOpenLnb
        },
        MUT_TOGGLE_CARD_DETAIL(state) {
            state.isOpenCardDetail = !state.isOpenCardDetail
        },
        MUT_TOGGLE_CHAT(state) {
            state.isOpenChat = !state.isOpenChat
        }
    },
    actions: {
        setLoading({commit}, payload) {
            commit("MUT_SET_LOADING", payload);
        },
        toggleLnb({commit}) {
            commit("MUT_TOGGLE_LNB")
        },
        toggleCardDetail({commit}) {
            commit("MUT_TOGGLE_CARD_DETAIL")
        },
        toggleChat({commit}) {
            commit("MUT_TOGGLE_CHAT")
        },
    },
    getters: {
        isLoading: (state) => {
            return state.isLoading
        },
        isOpenLnb: (state) => {
            return state.isOpenLnb
        },
        isOpenCardDetail: (state) => {
            return state.isOpenCardDetail
        },
        isOpenChat: (state) => {
            return state.isOpenChat
        },
    },
}

export default common