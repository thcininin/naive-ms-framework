import {requestHandler} from '@/utils/requestHandler';
import type {LoginDto, LoginInfo} from "@/interface/auth";

export function login(data: LoginDto) {
    return requestHandler<LoginInfo>(
        "POST",
        "/auth/login",
        {
            data
        }
    );
}

export function verifyLogin() {
    return requestHandler<boolean>(
        'GET',
        '/auth/is_login',

    );
}
export function reloadLoginInfo() {
    return requestHandler<LoginInfo>(
        'GET',
        '/auth/reload'
    );
}
export function loadLoginInfo() {
    return requestHandler<LoginInfo>(
        'GET',
        '/auth/load'
    );
}
export function logout() {
    return requestHandler(
        'GET',
        '/auth/logout'
    );
}