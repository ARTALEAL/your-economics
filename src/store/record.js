import { db } from '@/firebase';
import { addDoc, collection, getDocs, getDoc, doc } from 'firebase/firestore';

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
          const record = doc.data();
          records.push({ ...record, recordId: doc.id });
        });
        console.log(records);
        return records;
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchRecord({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid');
        const docRef = doc(db, `users/${uid}/records/`, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          return docSnap.data();
        } else {
          console.log('No such record');
        }
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
