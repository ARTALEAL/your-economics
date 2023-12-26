import { db } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
export default {
  actions: {
    async createCategory({ commit, dispatch }, { name, limit }) {
      try {
        const uid = await dispatch('getUid');
        const category = await setDoc(
          doc(db, 'users', uid),
          {
            categories: {
              name,
              limit,
            },
          },
          { merge: true }
        );
        return { name, limit, category };
      } catch (error) {
        commit('setError', e);
        throw error;
      }
    },
  },
};
