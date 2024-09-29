import {requestHandler} from '@/utils/requestHandler';
import type {Page} from '@/interface/interface';
import type {RoleVo} from '@/interface/Role';

export function fetchAllPage(page: number, size: number) {
    return requestHandler<Page<RoleVo>>(
        'GET',
        '/role/all/page',
        {
            params: {
                page: page,
                size: size
            }
        }
    );
}