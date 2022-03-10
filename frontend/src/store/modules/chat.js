const chat = {
  namespaced: true,
  state: {
    chatList: false,
  },
  mutations: {
    MUT_SET_CHAT_LIST(state, payload) {
      state.chatList = payload
    },
  },
  actions: {
    setChatList({commit}, payload) {
      commit("MUT_SET_CHAT_LIST", payload);
    },
  },
  getters: {
    getChatList: (state) => {
      return state.chatList
    },
  },
}

export default chat