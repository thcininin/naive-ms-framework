import {type BaseInterface} from '@/interface/interface';
import {type Gender} from '@/interface/dict';
import {type Resume} from '@/interface/resume';
import {type JobPost} from '@/interface/jobPost';
import type {JobVo, JobVoLite} from "@/interface/job";

export interface Candidate extends BaseInterface {
    name: string,
    gender: Gender,
    email: string,
    phone: string,
    resume: Resume,
    jobPost: JobPost,
    passed: boolean
}
export type CandidateVo = Readonly<Omit<Candidate, 'resume' | 'jobPost'> & {
    jobVo: JobVoLite,
}>
export type CandidateVoLite = Readonly<Pick<Candidate, 'id' |'name' | 'gender'>>