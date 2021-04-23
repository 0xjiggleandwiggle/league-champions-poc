const state = {
    drawer: true
  };
  const getters = {
    getDrawer : state =>{
      return state.drawer;
    }
  };
  const mutations = {
    activateDrawer : (state,payload)=>{
      state.drawer = payload;
    }
  };
  const actions = {
    activateDrawer : ({commit},payload)=>{
      commit('activateDrawer',payload);
    }
  };
  export default {
    state,
    getters,
    mutations,
    actions
  }