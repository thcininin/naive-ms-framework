import type {BaseInterface} from '@/interface/interface';

export interface Menu extends BaseInterface{
    dir: string,
    path: string,
    name: string,
    component: string,
    redirect: string,
    meta: {
        title: string,
        icon: string,
    },
    hidden: boolean,
    parentId: string,
    children: Menu[]
}
export type MenuVo = Readonly<Menu>