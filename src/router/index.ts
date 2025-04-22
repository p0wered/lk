import {createRouter, createWebHistory} from 'vue-router'

import ProfileView from '../views/ProfileView.vue'
import AuthView from "../views/AuthView.vue";

const routes = [
    {path: '/', component: ProfileView},
    {path: '/login', component: AuthView},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;