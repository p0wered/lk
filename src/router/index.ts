import {createMemoryHistory, createRouter} from 'vue-router'

import ProfileView from '../views/ProfileView.vue'
import AuthView from "../views/AuthView.vue";

const routes = [
    {
        path: '/',
        component: ProfileView,
        meta: {
            needAuth: true
        }
    },
    {
        path: '/login',
        component: AuthView
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

router.onError((error) => {
    console.error('Router error:', error)
})

router.beforeEach((to, from, next) => {
    console.log(from)
    if(to.meta.needAuth === true) {
        if(!localStorage.getItem('access_token')) {
            window.location.href = '/login'
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;