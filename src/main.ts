import './assets/main.css'

import {createApp, provide} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import {router} from './router'

import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';

import NaiveUiTable from 'naive-ui-table';
import 'naive-ui-table/dist/style.css';

import {useAuthorizeDirective} from '@/directives/authorize';
import {userStoreHandler} from "@/utils/userStoreHandler";
import type {StaffVoLite} from "@/interface/staff";


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(NaiveUiTable);

app.directive('authorize', useAuthorizeDirective);

app.mount('#app')

await userStoreHandler().init();
app.provide<StaffVoLite>('staffInfo', userStoreHandler().getStaffInfo());
