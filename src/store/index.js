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
      await auth.createUserWithEmailAndPassword(
        formData.email, formData.password,
      );

      await usersCollection.add({
        name: formData.name,
        email: formData.email,
        age: formData.age,
        country: formData.country,
      });

      commit('toggleAuth');
    },
  },
  modules: {},
  getters: {
  //  authModalShow: (state) => state.authModalShow,
  },
});
