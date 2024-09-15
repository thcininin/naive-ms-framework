import request from "@/utils/request";
import {AxiosError} from "axios";
import type {R} from "@/interface/interface";
import naiveui from "@/utils/naiveui";

type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH';
type Msg = '请先登录' | '没有权限' | '请求的资源不存在' | '服务器错误';
const msgMap: Record<number, Msg> = {
    401: '请先登录',
    403: '没有权限',
    404: '请求的资源不存在',
    500: '服务器错误'
};
export const requestHandler = async <T>(method: Method, url: string, config?: object): Promise<R<T>> => {
    try {
        const response = await request({
            method: method,
            url: url,
            ...config,
        });
        const errorMsg = msgMap[response.status];
        if (errorMsg) {
            naiveui.message.error(errorMsg);
        }
        return response.data as R<T>;
    } catch (e) {
        if (e instanceof AxiosError && e.response) {
            const status = e.response.status;
            const res = e.response.data as R<T>;
            naiveui.message.error(res.msg || msgMap[status]);
            if (status === 401) {
                window.location.href = '/login';
            }
        }
        naiveui.message.error('请求失败，请稍后重试！');
        throw new Error('请求失败，请稍后重试！');
    }
}