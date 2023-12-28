import { db } from '@/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export default {
  actions: {
    async createRecord(
      { dispatch, commit },
      { description, amount, type, id, date }
    ) {
      try {
        const uid = await dispatch('getUid');
        const record = await addDoc(collection(db, `users/${uid}/records`), {
          description,
          amount,
          type,
          id,
          date,
        });
        return { description, amount, type, id, date, BaseId: record.id };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      const records = [];
      try {
        const uid = await dispatch('getUid');
        const querySnapshot = await getDocs(
          collection(db, `users/${uid}/records`)
        );
        querySnapshot.forEach((doc) => {
          records.push(doc.data());
        });
        console.log(records);
        return records;
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
