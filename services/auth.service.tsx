import { BehaviorSubject } from 'rxjs';
import Router from 'next/router'
import Cookies from "js-cookie";

import { fetchWrapper } from '../helpers';

const url = "http://localhost:82/api"

const userSubject = new BehaviorSubject(process.browser && typeof window !== "undefined" && localStorage.getItem('user-data') !== null && localStorage.getItem('user-data') !== undefined && localStorage.getItem('user-data'))

interface Values {
    username: string,
    password: string
}

export const authService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject },
    login,
    logout
};

function login(data: Values) {
    return fetchWrapper.post(`${url}/login`, undefined, data).then((res: any) => {
        userSubject.next(res.data);
        localStorage.setItem('user-data', JSON.stringify(res.data));
        Cookies.set("user-token", res?.data?.data)
        Router.push("/");

        return res;
    });
}

function logout() {

    localStorage.removeItem('user-data');
    Cookies.remove('user-token')
    userSubject.next(null);
    Router.push('/login');
}

// function getAll() {
//     return fetchWrapper.get(baseUrl);
// }
