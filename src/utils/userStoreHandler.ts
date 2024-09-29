import {useUserStore} from "@/stores/user";
import {reloadLoginInfo, verifyLogin} from "@/api/authApi";
import {provide, ref} from "vue";

export function userStoreHandler() {
    const userStore = useUserStore();

    const {
        getLoginId,
        getStaffInfo,
        getMenuList,
        getRoleList,
        needReload,
        clearAll,
        setAll
    } = userStore;

    const isLogin = ref(false);

    async function init() {
        console.log('初始化');
        if(!await handleVerifyLogin()) {
            console.log('未登录')
            clearAll();
            if(window.location.pathname !== '/login') {
                console.log('跳转到登录页面')
                window.location.href = '/login';
            }
            return ;
        }else {
            console.log('已登录')
            if(!needReload()) {
                console.log('不需要重新加载')
                return;
            }
            console.log('重新加载')
            await handleReloadLoginInfo();
            if(window.location.pathname === '/login') {
                console.log('跳转到首页')
                window.location.href = '/';
            }
        }
    }

    async function handleVerifyLogin() {
        isLogin.value =  (await verifyLogin()).data;
        return isLogin.value;
    }
    async function handleReloadLoginInfo() {
        const {loginId,staffInfo , roleList, menuList} = (await reloadLoginInfo()).data;
        setAll(loginId,staffInfo, roleList, menuList);
    }
    return {
        init,
        isLogin,
        handleVerifyLogin,
        getLoginId,
        getStaffInfo,
        getMenuList,
        getRoleList,
        needReload,
    }
}