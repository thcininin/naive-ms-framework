import type {BaseInterface} from "@/interface/interface";

export interface Job extends BaseInterface{
    name: string,
    description: string,
}
export type JobVo = Partial<Job>
export type JobDto = Omit<Job, 'id' | 'createdAt'>
export type JobVoLite = Pick<Job, 'id' | 'createdAt' | 'name'>