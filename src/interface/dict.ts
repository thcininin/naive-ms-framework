import type {EduLevel} from "@/interface/jobPost";

export type Role = 'ADMIN' | 'USER' | 'MANAGER' | 'HR';

export const RoleText: Record<Role, string> = {
  ADMIN: '管理员',
  USER: '普通用户',
  MANAGER: '经理',
  HR: '人力资源专员'
}
export const EduLevelText: Record<EduLevel, string> = {
  NO_REQUIREMENT: '无学历要求',
  SENIOR: '高中',
  UNDERGRADUATE: '本科',
  POSTGRADUATE: '研究生',
}