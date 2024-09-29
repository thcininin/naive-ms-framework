import { ref } from 'vue';
import { defineStore } from 'pinia';
import type {MenuVo} from "@/interface/menu";
import type {RoleVo} from "@/interface/Role";
import type {StaffVoLite} from "@/interface/staff";

const storeKey = {
    UID: 'hrms_u_id',
    STAFF_INFO: 'hrms_s_info',
    ROLE_LIST: 'hrms_r_list',
    MENU_LIST: 'hrms_m_list'
} as const;
export const useUserStore = defineStore('user', () => {

    function setLoginId(id: string) {
        localStorage.setItem(storeKey.UID, id);
    }

    function getLoginId() {
        return localStorage.getItem(storeKey.UID);
    }
    function removeLoginId() {
        localStorage.removeItem(storeKey.UID);
    }
    function setStaffInfo(info: StaffVoLite) {
        localStorage.setItem(storeKey.STAFF_INFO, JSON.stringify(info));
    }
    function getStaffInfo() {
        const info = localStorage.getItem(storeKey.STAFF_INFO) ??null;
        if(info === null) {
            return null;
        }
        return JSON.parse(info);
    }
    function removeStaffInfo() {
        localStorage.removeItem(storeKey.STAFF_INFO);
    }
    function setRoleList(list: RoleVo[]) {
        localStorage.setItem(storeKey.ROLE_LIST, JSON.stringify(list));
    }
    function getRoleList() {
        return localStorage.getItem(storeKey.ROLE_LIST);
    }
    function removeRoleList() {
        localStorage.removeItem(storeKey.ROLE_LIST);
    }
    function setMenuList(list: MenuVo[]) {
        localStorage.setItem(storeKey.MENU_LIST, JSON.stringify(list));
    }
    function getMenuList(): MenuVo[] | null {
        const menuList = localStorage.getItem(storeKey.MENU_LIST) ??null;
        if(menuList === null) {
            return null;
        }
        return JSON.parse(menuList);
    }
    function removeMenuList() {
        localStorage.removeItem(storeKey.MENU_LIST);
    }

    function needReload() {
        return getLoginId() === null || getRoleList() === null || getMenuList() === null;
    }
    function clearAll() {
        removeLoginId();
        removeRoleList();
        removeMenuList();
        removeStaffInfo();
    }
    function setAll(id: string, staffInfo: StaffVoLite,  roleList: RoleVo[], menuList: MenuVo[]) {
        setLoginId(id);
        setRoleList(roleList);
        setMenuList(menuList);
        setStaffInfo(staffInfo);
    }

    return {
        getLoginId,
        getStaffInfo,
        getRoleList,
        getMenuList,
        needReload,
        clearAll,
        setAll
    }

});