import type {BaseInterface} from '@/interface/interface';
import type {StaffVoLite} from "@/interface/staff";

export interface Check extends BaseInterface {
    yrMth: string,
    date: string,
    account: string,
    checkAt: string,
    type: CheckType,
    state: CheckState
}
export type CheckState = 'NORMAL' | 'LATE' | 'EARLY' | 'RECHECK' | 'OVERTIME' | 'HOLIDAY' | 'LEAVE' | 'ABSENT';
export type CheckType = 'IN' | 'OUT';
export type CheckVo = Readonly<Omit<Check, 'account'> & {
    staff: StaffVoLite
}>
export type TodayCheck = {
    inState: CheckState,
    outState: CheckState
}