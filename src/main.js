import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidationPlugin from './includes/validation';
import { auth } from './includes/firebase';
import SimpleIcon from './directives/simple-icon';
import './assets/tailwind.css';
import './assets/main.css';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(VeeValidationPlugin);
    app.directive('simple-icon', SimpleIcon);

    app.mount('#app');
  }
});
