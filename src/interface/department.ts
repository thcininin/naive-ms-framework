import type{BaseInterface} from '@/interface/interface';
import type{Staff} from '@/interface/staff';

export interface Department extends BaseInterface {
    name: string;
    description: string;
    leader: Staff,
    parent: Department,
    staffs: Staff[],
    active: boolean,
}
export type DepartmentVo = Partial<Department>