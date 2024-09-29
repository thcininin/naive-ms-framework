import {requestHandler} from '@/utils/requestHandler';
import type {InterviewDto, Interview, InterviewVo} from '@/interface/interview';

export function createInterview(data: InterviewDto) {
    return requestHandler<Interview>(
        "POST",
        "/interview",
        {
            data
        }
    );
}
export function fetchInterviewList() {
    return requestHandler<InterviewVo[]>(
        "GET",
        "/interview"
    );
}