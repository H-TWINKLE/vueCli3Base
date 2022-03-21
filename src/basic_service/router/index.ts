import { createRouter, createWebHashHistory } from 'vue-router'
import { routerOption } from './routerOption'

const router = createRouter({
    history: createWebHashHistory(),
    routes: routerOption
})
export default router
