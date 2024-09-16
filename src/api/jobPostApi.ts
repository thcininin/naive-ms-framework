import {requestHandler} from "@/utils/requestHandler";
import type {JobPostDto, JobPostVo} from "@/interface/jobPost";

export function fetchJobPostList() {
    return requestHandler<JobPostVo[]>(
        "GET",
        "/job-post"
    );
}
export function toggleActive(id: string) {
    return requestHandler<boolean>(
        "PATCH",
        `/job-post/${id}`
    );
}
export function createJobPost(data: JobPostDto) {
    return requestHandler(
        "POST",
        "/job-post",
        {
            data
        }
    );
}
export function updateJobPost(id: string, data: JobPostDto) {
    return requestHandler(
        "POST",
        `/job-post/${id}`,
        {
            data
        }
    );
}