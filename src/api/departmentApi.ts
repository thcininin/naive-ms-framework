import {requestHandler} from '@/utils/requestHandler';
import type {DepartmentVo} from '@/interface/department';
import type {Page} from '@/interface/interface';

export function fetchAllPage(page: number, size: number) {
    return requestHandler<Page<DepartmentVo>>(
        'GET',
        '/department/all/page',
        {
            params: {
                page,
                size
            }
        }
    );
}