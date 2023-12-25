import { createStore } from 'vuex';
import auth from '@/store/auth';
import info from '@/store/info';

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (state) => state.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setClearError(state) {
      state.error = null;
    },
  },
  actions: {},
  modules: { auth, info },
});
