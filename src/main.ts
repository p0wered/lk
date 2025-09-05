import { createApp } from 'vue';
import { config, loadConfig } from "@/config.ts";
import App from './App.vue';
import router from './router';
import './assets/main.css';
import './assets/media.css';
import 'aos/dist/aos.css'
import AOS from 'aos';

async function bootstrap() {
    await loadConfig();

    const app = createApp(App);
    app.use(router);
    app.config.globalProperties.$config = config;
    app.mount('#app');
    AOS.init();
}

bootstrap();
