module.exports = {
    routes: [
        {path: '/', redirect: '/hot'},
        {path: '/hot', component: () => import('./components/hot.vue')},
        {path: '/manage', component: () => import('./components/manage.vue')}
    ]
};
