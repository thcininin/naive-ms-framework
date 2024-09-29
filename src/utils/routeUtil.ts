import {type RouteLocationNormalizedLoadedGeneric, type RouteRecordRaw, RouterLink, useRoute, useRouter} from "vue-router";
import type {MenuOption} from "naive-ui";
import {NIcon} from "naive-ui";
import {type Component, h} from "vue";
import type {MenuVo} from "@/interface/menu";


function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}
function renderRouterLink(route: RouteRecordRaw) {
    return () => h(RouterLink, {to: {name: route.name}}, {default: () => route.meta?.title});
}
export function generateMenuOptions(rootRoutes: RouteRecordRaw[]) {
    return rootRoutes
        .map(r => {
            const menuItem: MenuOption = {
                label: hasChildren(r) ? r.meta!.title : renderRouterLink(r),
                key: <string>r.name,
                icon: r.meta!.icon ? renderIcon(r.meta!.icon) : undefined,
            }
            if(r.children && r.children.length > 0) {
                menuItem.children = generateMenuOptions(r.children)
            }
            return menuItem;
        });

    function hasChildren(route: RouteRecordRaw) {
        return route.children && route.children.length > 0;
    }

}

export function routeTabs() {

}