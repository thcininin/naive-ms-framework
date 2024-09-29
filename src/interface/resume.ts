import type {BaseInterface} from "@/interface/interface";
import type {JobPost, JobPostVo} from "@/interface/jobPost";
import type {Gender} from "@/interface/dict";

export interface Resume extends BaseInterface{
    jobPost: JobPost,
    name: string,
    avatar: string,
    gender: Gender,
    email: string,
    phone: string,
    graduation: string,
    experienceRange: string,
    experience: string,
    skills: string,
    language: string,
    expectedSalaryRange: string,
    appliedAt: string,
    passed: boolean,
    introduction: string,
}
export type ResumeVo = Readonly<Partial<Omit<Resume, 'jobPost'> & {
    jobPost: JobPostVo
}>>