export interface R<T> {
    success: boolean,
    msg: string,
    data: T
}

export interface Acc {
    id: string,
    username: string,
    password: string,
    createdAt: string,
    role: string,
    staff: string
}
