import {requestHandler} from '@/utils/requestHandler';
import {type Page} from '@/interface/interface';
import type {CandidateVo, CandidateVoLite} from "@/interface/candidate";

export function fetchCandidatesList(current: string | number, size: string | number) {
    return requestHandler<Page<CandidateVo>>(
        "GET",
        "/candidate",
        {
            params: {
                current: current,
                size: size
            }
        }
    );
}
export function fetchCandidateLiteList() {
    return requestHandler<CandidateVoLite[]>(
        "GET",
        "/candidate/list"
    );
}