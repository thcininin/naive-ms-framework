import type {MenuVo} from "@/interface/menu";
import {router} from "@/router/index";
import {type RouteRecordNameGeneric, type RouteRecordRaw, RouterView} from "vue-router";
// 动态导入需要用户全局
const modules = import.meta.glob(['./../views/**/*.vue', './node_modules/@vicons/**']);

export function loadRoutes(menuList: MenuVo[]): Promise<void> {
    console.log('开始加载路由');
    return new Promise((resolve) => {
        const routes = router.options.routes;
        const root = routes.find(r => r.path === '/');

        if (!menuList) {
            resolve();
            return;
        }

        menuList.forEach(menu => {
            generate(menu, root);
        });

        resolve();

        function generate(menu: MenuVo, parent?: RouteRecordRaw) {
            const currentRoute: RouteRecordRaw = {
                path: menu.path,
                name: menu.name,
                component: renderComponent(menu),
                meta: {
                    ...menu.meta,
                    icon: asyncImportIcon(menu.meta.icon),
                },
                redirect: menu.redirect,
                children: []
            };

            if (parent) {
                parent.children?.push(currentRoute);
                router.addRoute(parent.name as NonNullable<RouteRecordNameGeneric>, currentRoute);
            } else {
                router.addRoute(currentRoute);
            }

            if (hasChildren(menu)) {
                menu.children.forEach(child => {
                    generate(child, currentRoute);
                });
            }
        }

        function hasChildren(menu: MenuVo) {
            return menu.children && menu.children.length > 0;
        }

        function renderComponent({dir, component}: MenuVo) {
            return isRouterViewStr(component) ? RouterView : modules[`../views/${dir}/${component}.vue`];
        }
        function asyncImportIcon(icon: string) {
            return modules[`./node_modules/@vicons/**/${icon}`]
        }

        function isRouterViewStr(component: string) {
            return component === 'RouterView';
        }
    });
}