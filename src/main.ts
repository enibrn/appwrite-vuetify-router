import App from './App.vue';

// Plugins
import pinia from '@/stores';
import router from '@/router';
import vuetify from '@/vuetify';

// Composables
import { createApp } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const app = createApp(App);

app.use(pinia);
//need to set the user the first time (before router is used)
const authStore = useAuthStore();
await authStore.refreshUser();

app.use(router);

app.use(vuetify);

app.mount('#app');