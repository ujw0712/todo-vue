export default {
  namespaced: true,
  state: () => ({
    authToken: null,
    user_id: null,
    email: null,
    name: null,
  }),
  mutations: {
    MUT_SET_SESSION: (_state, payload) => {
      if (payload.authToken) _state.authToken = payload.authToken
      if (payload.user_id) _state.user_id = payload.user_id
      if (payload.email) _state.email = payload.email
      if (payload.name) _state.name = payload.name
    },
    MUT_SET_CLEAR_SESSION: (_state) => {
      _state.authToken = null
      _state.user_id = null
      _state.email = null
      _state.name = null
    },
  },
  actions: {
    setSession: ({commit}, payload) => {
      commit("MUT_SET_SESSION", payload);
    },
    clearSession: ({commit}) => {
      commit("MUT_SET_CLEAR_SESSION");
    },
  },
  getters: {
    isLogin: (_state) => {
      return _state.authToken ? true : false
    },
    getAuthToken: (_state) => {
      return _state.authToken
    },
    getUserId: (_state) => {
      return _state.user_id
    },
    getEmail: (_state) => {
      return _state.email
    },
    getName: (_state) => {
      return _state.name
    },
  },
}