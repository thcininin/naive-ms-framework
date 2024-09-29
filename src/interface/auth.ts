import type {StaffVoLite} from "@/interface/staff";

export interface LoginDto {
    username: string,
    password: string
}
export interface LoginInfo {
    loginId: string,
    staffInfo: StaffVoLite,
    roleList: [],
    menuList: [],
}