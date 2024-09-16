import type {BaseInterface} from "@/interface/interface";
import type {Job, JobVo} from "@/interface/job";
import type {StringOrNumber} from "@/type/common";

export interface JobPost extends BaseInterface {
    job: Job,
    title: string,
    location: string,
    salaryRange: string,
    experienceRange: string,
    educationLevel: string,
    requirements: string,
    description: string,
    internship: boolean,
    internshipDuration: string,
    postDate: string,
    deadline: string,
    active: boolean,
}
export type EduLevel = 'NO_REQUIREMENT' | 'SENIOR' | 'UNDERGRADUATE' | 'POSTGRADUATE'
export type JobPostDto = Required<Omit<JobPost, 'id' | 'createdAt' | 'postDate' | 'job' | 'active' | 'educationLevel' | 'location'> & {
    jobId: StringOrNumber | undefined,
    educationLevel: string | undefined,
    location: string | undefined,
}>
export type JobPostVo = Readonly<Partial<Omit<JobPost, 'job'> & {
    job: JobVo
}>>