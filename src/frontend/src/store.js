import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { UPDATE_USER } from './mutation-types';
import createPersistedState from 'vuex-persistedstate'

const userInitialState = {
  isGuest: true,
  token: ''
}

export default new Vuex.Store({

  plugins: [createPersistedState()],
  state: {
    user: userInitialState
  },

  getters: {
    user(state) {
      return state.user
    },
    isUserGuest(state) {
      return state.user.isGuest
    }
  },

  mutations: {

    [UPDATE_USER](state, user) {
      state.user = { ...state.user, ...user }
    }
  },

  actions: {

    logOutUser({ commit }) {

      return new Promise((resolve, reject) => {
        commit(UPDATE_USER, userInitialState)
        resolve(true)
      })
    }
  }
})