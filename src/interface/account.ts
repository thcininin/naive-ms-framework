import type{BaseInterface} from '@/interface/interface';
import type{Gender, Role} from '@/interface/dict';
import type{Job} from '@/interface/job';
import type {Staff, StaffVoLite} from '@/interface/staff';
import type {RoleVo} from "@/interface/Role";

export interface Account extends BaseInterface{
    username: string,
    password: string,
    staff: Staff,
    job: Job,
    roles: Role[],
}
export type AccountVo = Pick<Account, 'id' | 'createdAt' | 'username'> & {
    staff: StaffVoLite,
    roles: RoleVo[]
}