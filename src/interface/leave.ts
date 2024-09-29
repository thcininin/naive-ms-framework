import type {BaseInterface} from '@/interface/interface';
import type {Staff, StaffVoLite} from "@/interface/staff";

export type LeaveType = 'SICK_LEAVE' | 'PERSONAL_LEAVE' | 'BUSINESS_TRIP' ;
export interface Leave extends BaseInterface{
    staff: Staff,
    reason: string,
    start: string,
    end: string,
    type: string,
    approved: boolean | null,
}
export type LeaveDto = Required<Omit<Leave, 'id' | 'createdAt' | 'staff' | 'approved'>>;
export type LeaveVo = Readonly<Partial<Omit<Leave, 'staff'>> & {
    staff: StaffVoLite
}>;