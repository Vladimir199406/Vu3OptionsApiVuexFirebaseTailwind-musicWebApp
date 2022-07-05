import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, formData) {
      const userCred = await auth.createUserWithEmailAndPassword(
        formData.email, formData.password,
      );

      await usersCollection.doc(userCred.user.uid).set({
        name: formData.name,
        email: formData.email,
        age: formData.age,
        country: formData.country,
      });

      await userCred.user.updateProfile({
        displayName: formData.name,
      });

      commit('toggleAuth');
    },
    async login({ commit }, formData) {
      await auth.signInWithEmailAndPassword(formData.email, formData.password);
      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
  },
  modules: {},
  getters: {
  //  authModalShow: (state) => state.authModalShow,
  },
});
