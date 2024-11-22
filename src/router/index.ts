import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
        meta: {
            title: "首页",
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
        meta: {
            title: "登录",
        },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router