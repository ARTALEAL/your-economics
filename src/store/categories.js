import { db } from '@/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
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
        commit('setError', error);
        throw error;
      }
    },
    async fetcCategories({ commit, dispatch }) {
      try {
        const categories = [];
        const uid = await dispatch('getUid');
        const querySnapShot =
          (await getDocs(collection(db, `users/${uid}/categories`))) || {};
        querySnapShot.forEach((doc) => {
          const category = {
            id: doc.id,
            name: doc.data().name,
            limit: doc.data().limit,
          };
          categories.push(category);
        });
        console.log(categories);
        return categories;
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
