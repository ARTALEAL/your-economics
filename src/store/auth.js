import { auth, db } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        commit('setError', error.code);
        throw error;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch('getUid');
        console.log(uid);
        await setDoc(doc(db, 'users', uid), {
          info: { bill: 10000, name: name },
        });
      } catch (error) {
        commit('setError', error.code);
        throw error;
      }
    },
    getUid() {
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
    async logout() {
      await signOut(auth);
    },
  },
};
