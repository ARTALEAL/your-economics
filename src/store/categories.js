import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
export default {
  actions: {
    async createCategory({ commit, dispatch }, { name, limit }) {
      try {
        const uid = await dispatch('getUid');
        const category = await addDoc(
          collection(db, `users/${uid}/categories`),
          {
            name,
            limit,
          }
        );
        return { name, limit, id: category.id };
      } catch (error) {
        commit('setError', e);
        throw error;
      }
    },
  },
};
