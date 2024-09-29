
export interface R<T> {
    success: boolean,
    msg: string,
    data: T
}
export interface BaseInterface {
    readonly id: string,
    readonly createdAt: string,
}
export interface Page<T> {
    records: T[],
    total: number,
    current: number,
    size: number,

}
