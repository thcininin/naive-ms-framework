import {type BaseInterface} from '@/interface/interface';
export interface Interview extends BaseInterface {
    title: string,
    interviewDate: string,
    interviewer: string,
    mode: InterviewMode,
    location: string,
    meeting: Meeting,
    meetingLink: string,
    remark: string,
    interviewCandidates: {id: string, candidate: {id: string, name: string}}[],
}
export type InterviewMode = 'ONLINE' | 'OFFLINE';
export type Meeting = 'DING_TALK' | 'TENCENT_MEETING' | 'LARK';
export type InterviewDto = Omit<Interview, 'id' | 'createdAt' | 'interviewCandidates' | 'mode' | 'meeting'> & {
    candidateIds: string[],
    mode: InterviewMode | undefined,
    meeting: Meeting | undefined,
}
export type InterviewVo = Readonly<Interview>