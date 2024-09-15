import {type RouteLocationNormalizedLoadedGeneric, type RouteRecordRaw, RouterLink, useRoute, useRouter} from "vue-router";
import type {MenuOption} from "naive-ui";
import {NIcon} from "naive-ui";
import {type Component, h} from "vue";


const route = useRoute();
const router = useRouter();

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
function renderRouterLink(route: RouteRecordRaw) {
    return () => h(RouterLink, {to: {name: route.name}}, {default: () => route.meta?.title});
}
export function generateMenuOptions(rootRoutes: RouteRecordRaw[]) {
    return rootRoutes
        .map(r => {
            const menuItem: MenuOption = {
                label: r.children ? r.meta!.title : renderRouterLink(r),
                key: <string>r.name,
                icon: r.meta!.icon ? renderIcon(r.meta!.icon) : undefined,
            }
            if(r.children && r.children.length > 0) {
                menuItem.children = generateMenuOptions(r.children)
            }
            return menuItem;
        });
}

export function routeTabs() {

}