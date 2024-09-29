import type {EduLevel} from "@/interface/jobPost";
import type {InterviewMode, Meeting} from "@/interface/interview";
import type {LeaveType} from "@/interface/leave";
import type {CheckState, CheckType} from "@/interface/check";
import type {IssuedMethod} from "@/interface/salary";

export type Role = 'ADMIN' | 'USER' | 'MANAGER' | 'HR';
export type Gender = 'MALE' | 'FEMALE';
export const RoleText: Record<Role, string> = {
  ADMIN: '管理员',
  USER: '普通用户',
  MANAGER: '经理',
  HR: '人力资源专员'
}
export const RoleSymbol: Record<Role, string> = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
  HR: 'hr'
}
export const EduLevelText: Record<EduLevel, string> = {
  NO_REQUIREMENT: '无学历要求',
  SENIOR: '高中',
  UNDERGRADUATE: '本科',
  POSTGRADUATE: '研究生',
}
export const GenderText: Record<Gender, string> = {
  MALE: '男',
  FEMALE: '女'
}
export const InterviewModeText: Record<InterviewMode, string> = {
  ONLINE: '线上',
  OFFLINE: '线下',
}
export const MeetingText: Record<Meeting, string> = {
  DING_TALK: '钉钉',
  TENCENT_MEETING: '腾讯会议',
  LARK: '飞书',
}
export const LeaveTypeText: Record<LeaveType, string> = {
  SICK_LEAVE: '病假',
  PERSONAL_LEAVE: '事假',
  BUSINESS_TRIP: '出差'
}
export const CheckStateText: Record<CheckState, string> = {
  NORMAL: '正常打卡',
  LATE: '迟到',
  EARLY: '早退',
  RECHECK: '补卡',
  OVERTIME: '加班',
  HOLIDAY: '节假日',
  LEAVE: '请假',
  ABSENT: '缺勤'
}
export const CheckStateTagType: Record<CheckState, string> = {
  NORMAL: 'success',
  LATE: 'warning',
  EARLY: 'warning',
  RECHECK: 'info',
  OVERTIME: 'success',
  HOLIDAY: 'info',
  LEAVE: 'info',
  ABSENT: 'default'
}
export const CheckTypeText: Record<CheckType, string> = {
  IN: '签到',
  OUT: '签退'
}
export const IssuedMethodText: Record<IssuedMethod, string> = {
  CREDIT_CARD: '信用卡',
  CASH: '现金',
  CHECK: '支票',
  WECHAT_PAY: '微信转账',
  ALIPAY: '支付宝转账',
}
export const IssuedText: Record<string, string> = {
  true: '已发放',
  false: '未发放'
}
export const ConfirmedText: Record<string, string> = {
  true: '已确认',
  false: '未确认'
}