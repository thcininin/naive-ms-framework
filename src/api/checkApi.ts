import {requestHandler} from '@/utils/requestHandler';
import type {CheckVo, TodayCheck} from "@/interface/check";
import type {Page} from "@/interface/interface";

export function checkIn() {
    return requestHandler(
        'POST',
        '/check/check-in'
    );
}
export function checkOut() {
    return requestHandler(
        'POST',
        '/check/check-out'
    );
}
export function fetchChecksPage(page: number, size: number) {
    return requestHandler(
        'GET',
        '/check/all',
        {
            params: {
                page,
                size
            }
        }
    );
}
export function fetchTodayChecks() {
    return requestHandler<CheckVo[]>(
        'GET',
        '/check/all/today'
    );
}
export function fetchMyTodayCheck() {
    return requestHandler<TodayCheck>(
        'GET',
        '/check/my/today'
    );
}
export function fetchMyCheckRecords(year: number, month: number) {
    return requestHandler<CheckVo[]>(
        'GET',
        '/check/my/records',
        {
            params: {
                year: year,
                month: month
            }
        }
    );
}