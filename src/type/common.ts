import type {Ref, VNode} from "vue";

export type StringOrNumber = string | number;
export type Tab = {
    label: string,
    name: string,
}
export type DropdownOption = {
    label: string ,
    key: StringOrNumber,
    callback?: () => void
}
export type TableColumn<T> = {
    title: string,
    key: keyof T & StringOrNumber | 'operations',
    width?: StringOrNumber,
    fixed?: 'left' | 'right' | boolean,
    r?: (row: T) => VNode ,
}
export type Pagination = {
    page: StringOrNumber,
    pageSize: StringOrNumber,
    pageCount: StringOrNumber,
    pageCallback: (page: StringOrNumber) => void,
}
export type ListOption = Partial<{
    readonly id: StringOrNumber,
    avatar: string,
    header: string,
    extraText: string,
    extraType: 'text' | 'switch'
    switchOption: Partial<{ checkedText: string, uncheckedText: string, active: boolean }>,
    switchLoading: Ref<boolean>,
    tags: string[]
    content: string,
    startTime: string,
    endTime: string,
    level: 'default' | 'info' | 'warning' | 'error' | 'success'
}>
export type ButtonType = 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error'
export type ButtonSize = 'tiny' |'small' |'medium' | 'large'
export type SwitchSize = Omit<ButtonSize, 'tiny'>
export type OperationType = 'add' | 'edit'
export const ListOptionLevelClass: Record<NonNullable<ListOption['level']>, string> = {
    default: 'bg-gray-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
    error:'bg-red-500',
    success: 'bg-green-500'
}