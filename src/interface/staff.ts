import type{BaseInterface} from '@/interface/interface';
import type{Gender, Role} from '@/interface/dict';
import type {Job, JobVoLite} from '@/interface/job';

export interface Staff extends BaseInterface{
    sid: string,
    name: string,
    avatar: string,
    gender: Gender,
    email: string,
    phone: string,
    address: string,
    birthday: string,
    entryDate: string,
    exitDate: string,
    baseSalary: string,
    bind: boolean,
    job: Job,
}
export type StaffVoLite = Pick<Staff, 'id' | 'createdAt' | 'sid' | 'name' | 'avatar'> & {
    job: JobVoLite
}