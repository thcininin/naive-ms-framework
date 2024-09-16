import type {EduLevel, JobPostVo} from "@/interface/jobPost";
import {EduLevelText} from "@/interface/dict";

export function generateJobPostTags(post: JobPostVo): string[] {
    const jobName = post.job?.name;
    const location = post.location;
    const educationLevel = EduLevelText[<EduLevel>post.educationLevel];
    const experienceRange = post.experienceRange ? post.experienceRange : '无经验';
    const internship = post.internship ? '可实习' : '无实习';
    const internshipDuration = post.internshipDuration;
    return [`${jobName}`, `${location}`, `${educationLevel}`, `${experienceRange}`, `${internship}`, `${internshipDuration}`];
}

export function generateEduLevelList() {
    return Object.keys(EduLevelText).map(key => ({
        label: EduLevelText[<EduLevel>key],
        value: key
    }));
}