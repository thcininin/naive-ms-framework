import {useTabStore} from "@/stores/tab";
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";
import {watch, watchEffect} from "vue";

export function tabHandler() {
    const route = useRoute();

    const {
        addTab,
        removeTab,
        getTabs,
        removeAllTabs,
        removeOtherTab
    } = useTabStore();

    const {tabs} = storeToRefs(useTabStore());

    watch(() => route.name, (n, o) => {
        // console.log("初始化");
        getTabs();
        addTab({label: <string>route.meta.title, name: <string>route.name});
    }, {
        immediate: true
    });

    return {
        tabs,
        removeTab,
        removeAllTabs,
        removeOtherTab
    }
}