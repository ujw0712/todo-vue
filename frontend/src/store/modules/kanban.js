const kanban = {
  namespaced: true,
  state: {
    listList: false,
  },
  mutations: {
    MUT_SET_LIST_LIST(state, payload) {
      state.listList = payload
    },
  },
  actions: {
    setListList({commit}, payload) {
      commit("MUT_SET_LIST_LIST", payload);
    },
  },
  getters: {
    getListList: (state) => {
      return state.listList
    },
  },
}

export default kanban