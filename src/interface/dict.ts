export type Role = 'ADMIN' | 'USER' | 'MANAGER' | 'HR';

export const RoleText: Record<Role, string> = {
  ADMIN: '管理员',
  USER: '普通用户',
  MANAGER: '经理',
  HR: '人力资源专员'
};