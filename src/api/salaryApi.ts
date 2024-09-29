import {requestHandler} from '@/utils/requestHandler';
import type {Page} from '@/interface/interface'
import type {SalaryVo} from '@/interface/salary'

export function fetchMySalaryPage(page: number, size: number) {
    return requestHandler<Page<SalaryVo>>(
        'GET',
        '/salary/self/page',
        {
            params: {
                page: page,
                size: size
            }
        }
    );
}
export function fetchAllSalaryPage(page: number, size: number) {
    return requestHandler<Page<SalaryVo>>(
        'GET',
        '/salary/page/all',
        {
            params: {
                page: page,
                size: size
            }
        }
    );
}