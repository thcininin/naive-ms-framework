import {requestHandler} from "@/utils/requestHandler";
import type {JobDto, JobVo} from "@/interface/job";
import {ref} from "vue";

export function fetchJobList() {
    return requestHandler<JobVo[]>(
        "GET",
        "/job"
    );
}
export function createJob(data: JobDto) {
    return requestHandler<JobVo>(
        "POST",
        "/job",
        {
            data
        }
    );
}
export function updateJob(id: string, data: JobDto) {
    return requestHandler<JobVo>(
        "POST",
        `/job/${id}`,
        {
            data
        }
    );
}