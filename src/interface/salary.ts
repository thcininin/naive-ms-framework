import type{BaseInterface} from '@/interface/interface';
import type{Account} from '@/interface/account';
import type {StaffVoLite} from "@/interface/staff";

export interface Salary extends BaseInterface{
    account: Account,
    yrMth: string,
    basicSalary: string,
    bonus: string,
    deduction: string,
    tax: string,
    overtimeSalary: string,
    beforeTaxSalary: string,
    actualSalary: string,
    issued: boolean,
    method: IssuedMethod,
    issueDate: string,
    confirmed: boolean,
    confirmedDate: string,
    remark: string,
}
export type IssuedMethod = 'CREDIT_CARD' | 'CASH' | 'CHECK' | 'WECHAT_PAY' | 'ALIPAY' ;
export type SalaryVo = Readonly<Omit<Salary, 'account' | 'issued' | 'confirmed'> & {
    issued: boolean | string,
    confirmed: boolean | string,
    staff: StaffVoLite,
}>