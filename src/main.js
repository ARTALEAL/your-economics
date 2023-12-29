import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Loader from '@/components/app/Loader.vue';
import messagePlugin from './utils/message.plugin';
import Paginate from 'vuejs-paginate-next';
import tooltipDirective from './directives/tooltip.directive';
import 'materialize-css/dist/js/materialize.min';
import { auth } from './firebase';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .directive('tooltip', tooltipDirective)
      .component('Loader', Loader)
      .component('paginate', Paginate)
      .mount('#app');
  }
});
