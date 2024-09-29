import type {BaseInterface} from '@/interface/interface';
import type {MenuVo} from "@/interface/menu";

export interface Role extends BaseInterface{
    name: string;
    description: string;
    active: boolean;
    menus: MenuVo[]
}
export type RoleVo = Omit<Role, 'menus'>