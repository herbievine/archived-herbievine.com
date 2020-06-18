import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import firebase from 'firebase';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/work',
        name: 'Work',
        component: () => import('../views/Work.vue'),
    },
    {
        path: '/work/:id',
        name: 'AboutWork',
        component: () => import('../views/AboutWork.vue'),
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue'),
    },
    {
        path: '/loading',
        name: 'Loading',
        component: () => import('../components/Loading.vue'),
    },
    {
        path: '/redirect',
        name: 'Redirect',
        beforeEnter: (to, from, next) => {
            if (!to.query.t) next({ name: 'Home' });
            else window.open(decodeURI(to.query.t), '_SELF');
        },
    },
    {
        path: '/login',
        name: 'Login',
        beforeEnter: (to, from, next) => {
            const user = firebase.auth().currentUser;

            if (user !== null) return next({ name: 'Admin' });
            else next();
        },
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/account',
        name: 'Account',
        beforeEnter: (to, from, next) => {
            const user = firebase.auth().currentUser;

            if (user !== null) return next({ name: 'Admin' });
            else next();
        },
        component: () => import('../views/Account.vue'),
    },
    {
        path: '/admin',
        name: 'Admin',
        beforeEnter: (to, from, next) => {
            const user = firebase.auth().currentUser;

            if (user === null) return next({ name: 'Login' });
            else next();
        },
        component: () => import('../views/Admin.vue'),
    },
    {
        path: '/404',
        name: 'PageNotFound',
        component: () => import('../views/PageNotFound.vue'),
    },
    {
        path: '*',
        redirect: '/404',
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (
        !from.name &&
        from.name !== 'Loading' &&
        to.name !== 'Redirect' &&
        to.name !== 'Loading'
    )
        next(
            `/loading${
                to.name
                    ? `?url=${to.name === 'AboutWork' ? 'Work' : to.name}`
                    : ''
            }`
        );
    else next();
});

export default router;
