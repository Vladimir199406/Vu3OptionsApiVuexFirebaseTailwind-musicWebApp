import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';
import { Howl } from 'howler';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    newSong(state, songData) {
      state.currentSong = songData;
      state.sound = new Howl({
        src: [songData.url],
        html5: true,
      });
    },
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
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
    async signout({ commit }) {
      await auth.signOut();
      commit('toggleAuth');
    },
    async newSong({ commit, state }, songData) {
      commit('newSong', songData);

      state.sound.play();
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
  },
  modules: {},
});
