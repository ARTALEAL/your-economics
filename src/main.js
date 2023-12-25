import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Loader from '@/components/app/Loader.vue';
import messagePlugin from './utils/message.plugin';
import 'materialize-css/dist/js/materialize.min';

createApp(App)
  .use(store)
  .use(router)
  .use(messagePlugin)
  .component('Loader', Loader)
  .mount('#app');
