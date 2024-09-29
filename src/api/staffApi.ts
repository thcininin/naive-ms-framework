import {requestHandler} from '@/utils/requestHandler';
import type {Staff} from '@/interface/staff';

export function fetchAllList() {
    return requestHandler<Staff[]>(
        'GET',
        '/staff/all/list'
    );
}