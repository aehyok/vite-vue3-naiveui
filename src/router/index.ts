import { createRouter, createWebHashHistory } from "vue-router";
import {  NavigationGuardNext } from 'vue-router'
import NProgress from "@/utils/progress/index";

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
            showLayout: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
        meta: {
            title: "登录",
            showLayout: false,
        },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

/**
 * 进入路由前
 */
router.beforeEach((_to, _from, next: NavigationGuardNext) => {
    NProgress.start();
    let token = localStorage.getItem("token");
    console.log("token", token)
    console.log(localStorage.getItem("token"),"1111111111")
    console.log(_to, _from, "be=to=from")

    // 不需要token就可以访问的路由
    if(_to.path === "/login") {
        next()
    }

    // 需要token才能访问的路由
    if(token) {
        next()
    } else {
        next("/login")
    }
    // if (!localStorage.getItem("token")) {
    //     next("/login");
    //     console.log("-login-")
    // } else {
    //     next()
    // }
    // next("/login" )
    next()
})

/**
 * 进入路由后
 */
router.afterEach((_to, _from, failure) => {
    NProgress.done();
    console.log("failure", failure)
})

export default router