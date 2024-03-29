import { db } from '@/firebase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
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
    async fetcCategory({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid');
        const docRef = doc(db, `users/${uid}/categories/`, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          return docSnap.data();
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async updateCategory({ commit, dispatch }, { id, name, limit }) {
      try {
        const uid = await dispatch('getUid');
        const updateRef = doc(db, `users/${uid}/categories`, `${id}`);
        await updateDoc(updateRef, {
          name,
          limit,
        });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
