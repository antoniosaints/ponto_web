import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/templates/Default.vue'),
        children: [
            { // Rotas de ponto
                path: '/',
                name: 'Home',
                component: () => import('@/views/Home/PontoView.vue')
            },
            { // Rotas de relatórios
                path: '/relatorios',
                name: 'Relatorios',
                children: [
                    {
                        path: '/relatorios/lista',
                        name: 'Lista',
                        component: () => import('@/views/Relatorios/ListaRelatorioView.vue')
                    },
                ]
            },
            { //  Rotas de espelho
                path: '/espelho',
                name: 'Espelho',
                component: () => import('@/views/Espelho/EspelhoPontoView.vue')
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router