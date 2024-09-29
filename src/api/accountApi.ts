import {requestHandler} from '@/utils/requestHandler';
import type {Page} from '@/interface/interface';
import type {AccountVo} from "@/interface/account";
import type {Role} from "@/interface/dict";

export function fetchAccountPage(page: number, size: number, role?: Role, name?: string, sid?: number) {
    return requestHandler<Page<AccountVo>>(
        'GET',
        '/account',
        {
            params: {
                page: page,
                size: size,
                role: role,
                name: name,
                sid: sid
            }
        }
    );
}