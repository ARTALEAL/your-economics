import { db } from '@/firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';
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
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateInfo({ commit, dispatch, getters }, newData) {
      try {
        const uid = await dispatch('getUid');
        const updateData = { ...getters.info, ...newData };
        const infoRef = doc(db, `users`, uid);
        setDoc(infoRef, { info: updateData }, { merge: true });
        commit('setInfo', updateData);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
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
