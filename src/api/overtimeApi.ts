import {requestHandler} from '@/utils/requestHandler';
import type {Page} from "@/interface/interface";
import type {Overtime, OvertimeVo} from "@/interface/overtime";

export function applyOvertime() {
    return requestHandler(
        "POST",
        "/overtime"
    );
}
export function fetchAllOvertimePage(page: number, size: number, status?: boolean) {
    return requestHandler<Page<OvertimeVo>>(
        'GET',
        '/overtime/all/page',
        {
            params: {
                page: page,
                size: size,
                status: status
            }
        }
    );
}
export function reviewOvertimes(data: Array<string | number>, status: boolean) {
    return requestHandler(
        'POST',
        '/overtime/review',
        {
            data,
            params: {
                status
            }
        }
    );
}