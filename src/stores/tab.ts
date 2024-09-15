import {ref, watch} from 'vue';
import { defineStore } from 'pinia';
import { useRoute, useRouter } from "vue-router";
import type {Tab} from "@/type/common";

const storedKey = 'tab';

export const useTabStore = defineStore('tab', () => {
    const route = useRoute();
    const router = useRouter();

    const tabs = ref<Tab[]>([]);
    const initialTab: Tab = {label: '分析页', name: 'Analysis'}

    function addTab(tab: Tab) {
        if (!tabs.value.some(t => t.name === tab.name)) {
            tabs.value.push({ label: tab.label, name: tab.name });
            setTabs();
        }
    }
    function removeTab(name: string) {
        tabs.value = tabs.value.filter(t => t.name !== name);
        const length = tabs.value.length;
        setTabs();
        if(name === route.name) {
            if(length === 0) {
                init();
            }
            router.push({name: length > 0 ? tabs.value[length - 1].name : initialTab.name})
        }
    }

    function getTabs() {
        const storedTabs = localStorage.getItem(storedKey);
        if (storedTabs) {
            tabs.value = JSON.parse(storedTabs);
        }
        return tabs.value;
    }

    function setTabs() {
        localStorage.setItem(storedKey, JSON.stringify([...tabs.value]))
    }

    function init() {
        if (tabs.value && tabs.value.length === 0) {
            addTab(initialTab);
        } else {
            getTabs();
        }
        setTabs();
    }
    function removeAllTabs() {
        tabs.value = [];
        init();
        router.push({name: initialTab.name});
    }
    function removeOtherTab(name: string) {
        tabs.value = tabs.value.filter(t => t.name === name);
        setTabs();
        router.push({name: name});
    }

    return {
        tabs,
        addTab,
        removeTab,
        getTabs,
        removeAllTabs,
        removeOtherTab,
    }

});