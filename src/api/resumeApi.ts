import {requestHandler} from '@/utils/requestHandler';
import type {ResumeVo} from '@/interface/resume';

export function fetchResumeList() {
    return requestHandler<ResumeVo[]>(
        "GET",
        "/resume"
    );
}
export function passResumes(data: string[]) {
    return requestHandler(
        "POST",
        "/resume/pass",
        {
            data
        }
    );
}