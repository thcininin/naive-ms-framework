import type {VNode} from "vue";

type StringOrNumber = string | number;
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
export type ListOption = {
    header: string,
    extra: string,
    tags: string[]
    content: string,
    time: string,
    level?: 'info' | 'warning' | 'error'
}
export type ButtonType = 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error'
export type ButtonSize = 'tiny' |'small' |'medium' | 'large'
export type SwitchSize = Omit<ButtonSize, 'tiny'>
export type OperationType = 'add' | 'edit'
