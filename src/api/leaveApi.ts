import {requestHandler} from '@/utils/requestHandler';
import type {LeaveDto, LeaveVo} from "@/interface/leave";
import type {Page} from "@/interface/interface";

export function applyLeave(data: LeaveDto) {
    return requestHandler<LeaveVo>(
        "POST",
        "/leave",
        {
            data
        }
    );
}
export function fetchLeaveList() {
    return requestHandler<LeaveVo[]>(
        "GET",
        "/leave"
    );
}
export function fetchPendingLeavePage(page: number, size: number) {
    return requestHandler<Page<LeaveVo>>(
        "GET",
        "/leave/pending",
        {
            params: {
                page: page,
                size: size
            }
        }
    );
}
export function reviewLeaves(status: boolean, data: Array<string | number>) {
    return requestHandler<LeaveVo[]>(
        "POST",
        "/leave/review",
        {
            params: {
                status
            },
            data
        }
    );
}
