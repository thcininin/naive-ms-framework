import type {EduLevel, JobPostVo} from "@/interface/jobPost";
import {EduLevelText, GenderText, InterviewModeText, LeaveTypeText, MeetingText, RoleText} from "@/interface/dict";
import treeData from "china-area-tree-data";
import type {ProvinceAndCity} from "@/type/common";
import Resume from "@/views/recruitment/Resume.vue";
import type {ResumeVo} from "@/interface/resume";
import type {InterviewMode, Meeting} from "@/interface/interview";

const provinceCityData: ProvinceAndCity[] = treeData
provinceCityData.forEach(data => {
    if (data.children && data.children.length > 0) {
        data.children.forEach((child: any) => {
            delete child.children
        });
    }
});

export function generateJobPostTags(post: JobPostVo): string[] {
    const jobName = post.job?.name;
    const location = valueToCityLabel(post.location);
    const educationLevel = EduLevelText[<EduLevel>post.educationLevel];
    const experienceRange = post.experienceRange ? post.experienceRange : '无经验';
    const internship = post.internship ? '可实习' : '';
    const internshipDuration = post.internshipDuration;
    return [`${jobName}`, `${location}`, `${educationLevel}`, `${experienceRange}`, `${internship}`, `${internshipDuration}`]
        .filter(t => t.trim() !== '');
}

export function generateEduLevelList() {
    return Object.keys(EduLevelText).map(key => ({
        label: EduLevelText[<EduLevel>key],
        value: key
    }));
}

export function valueToCityLabel(value?: string) {
    if (value === null || value === undefined || value.length !== 6) {
        return '';
    }
    // 如果后四位都是0, 这说明是省份, 否则是城市
    if (value.slice(-4) === '0000') {
        return provinceCityData.filter(item => item.value === value)[0].label;
    }
    const province = provinceCityData.filter(item => item.value === value.slice(0, 2) + '0000')[0];
    if (province.children && province.children.length > 0) {
        return province.children.filter(item => item.value === value)[0].label;
    }
    return '';
}

export function generateResumeTags(resume: ResumeVo): string[] {
    const tags: string[] = [];
    const graduation = !!resume.graduation ? resume.graduation : '';
    const experienceRange = !!resume.experienceRange ? resume.experienceRange : '';
    const language = !!resume.language ? '多语言' : '';
    tags.push(graduation, experienceRange, language)
    return tags.filter(t => t);
}

export const genderOptions = Object.entries(GenderText)
    .map(([k, v]) => ({
        label: v,
        value: <string>k
    }));
export const modeOptions = Object.entries(InterviewModeText)
    .map(([k, v]) => {
        return {
            label: v,
            value: <InterviewMode>k
        }
    });
export const meetingOptions = Object.entries(MeetingText)
    .map(([k, v]) => ({
        label: v,
        value: <Meeting>k
    }));
export const LeaveTypeOptions = Object.entries(LeaveTypeText)
    .map(([k, v]) => ({
        label: v,
        value: <string>k
    }));
export const RoleDropdownOptions = Object.entries(RoleText)
    .map(([k, v]) => ({
        label: v,
        key: <string>k
    }));
export const RoleOptions = Object.entries(RoleText)
    .map(([k, v]) => ({
        label: v,
        value: <string>k
    }));
