import type {BaseInterface} from '@/interface/interface';
import type {StaffVoLite} from "@/interface/staff";

export interface Overtime extends BaseInterface {
    staff: string,
    date: string,
    endTime: string,
    hours: string,
    approved: boolean | null,
}
export type OvertimeVo = Readonly<Partial<Omit<Overtime, 'staff'>> & {
    staff: StaffVoLite
}>