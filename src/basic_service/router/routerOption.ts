export const routerOption = [
    {
        path: '/Login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Login" */'@/view/login/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/',
        name: 'Base',
        component: () => import(/* webpackChunkName: "common/base" */'@/components/base/Base.vue'),
        meta: { title: '基础页面' },
        children: [
            {
                path: '/',
                name: 'Index',
                component: () => import(/* webpackChunkName: "Home" */'@/view/home/Home.vue'),
                meta: { title: '主页' }
            }
        ]
    }
]
