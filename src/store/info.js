import { db } from '@/firebase';
import { getDoc, doc } from 'firebase/firestore';
export default {
  state: {
    info: {},
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const info = await getDoc(doc(db, 'users', uid));
        commit('setInfo', info.data().info);
      } catch (error) {}
    },
  },
  getters: {
    info(state) {
      return state.info;
    },
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
};
