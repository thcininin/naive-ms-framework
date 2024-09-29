import {useUserStore} from '@/stores/user';
import type {DirectiveBinding} from 'vue';
export const useAuthorizeDirective = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const userStore = useUserStore();
        const roles = userStore.getRoleSymbol();
        // const requiredRoles: string[] = binding.value;
        const requiredRoles: string = binding.value;
        let hasRoles;
        if(roles) {
            // hasRoles = requiredRoles.some((role: string) => roles.includes(role));
            hasRoles = requiredRoles === roles;
        }
        if(!hasRoles) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    }
};