import {createApp} from 'vue'
import App from './App.vue'
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import './assets/main.css'
import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';


import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

import {createRouter} from "vue-router";
import {createWebHistory} from "vue-router";

import axios from 'axios'
import VueAxios from 'vue-axios'


const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path: '/login', component: Login, name: 'Login'},
    {path: '/register', component: Register, name: 'Register'},
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

const app = createApp(App)
app.use(PrimeVue)
app.use(DialogService);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app')
