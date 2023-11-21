// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router.js';

// Crie a instância da aplicação
const app = createApp(App);

// Use o Vue Router na aplicação
app.use(router);

// Monte a aplicação
app.mount('#app');
