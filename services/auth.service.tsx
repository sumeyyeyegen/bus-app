import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'
import Cookies from "js-cookie";

import { fetchWrapper } from '../helpers';
import Alert from '../helpers/Alert';

const url = "http://localhost:83/api"

const userSubject = new BehaviorSubject(process.browser && typeof window !== "undefined" && localStorage.getItem('user-data') !== null && localStorage.getItem('user-data') !== undefined && localStorage.getItem('user-data'))

interface Values {
    //TODO: username: string,
    email: string,
    password: string
}

export const authService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject },
    login,
    logout,
    register
};

const setCookie = (res: any) => {
    let d = new Date();
    d.setTime(d.getTime() + (60 * 60 * 1000));
    Cookies.set("user-token", res?.data?.data?.token, { expires: d, path: "*" })

}

function login(data: Values) {
    //TODO: yeni backend için (/auth) eklenmeli
    return fetchWrapper.post(`${url}/auth/login`, undefined, data).then((res: any) => {
        userSubject.next(res.data);
        localStorage.setItem('user-data', JSON.stringify(res.data));
        setCookie(res);
        // Cookies.set("user-token", res?.data?.data)
        Router.push("/");

        return res;
    });
}

function register(data: Values) {
    return fetchWrapper.post(`${url}/auth/register`, undefined, data).then((res: any) => {
        // userSubject.next(res.data);
        // localStorage.setItem('user-data', JSON.stringify(res.data));
        // setCookie(res);
        // Cookies.set("user-token", res?.data?.data)
        return res;
    });
}

function logout() {

    localStorage.removeItem('user-data');
    Cookies.remove('user-token')
    userSubject.next(null);
    Router.push('/login');
}
