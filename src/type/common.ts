import type {VNode} from "vue";

type StringOrNumber = string | number;
export type Tab = {
    label: string,
    name: string
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
