import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';

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
  },
};
