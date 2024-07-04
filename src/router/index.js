// router.js
import { createMemoryHistory, createRouter } from 'vue-router';
import Dashboard from "@/components/Dashboard.vue";
import TemplateView from "@/views/TemplateView.vue";
import TemplateView2 from "@/views/TemplateView2.vue";

const routes = [
    {
        path: '/',
        component: Dashboard,
        children: [
            { path: '', component: TemplateView },
            { path: 'template', component: TemplateView },
            { path: 'template2', component: TemplateView2 },
        ],
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
