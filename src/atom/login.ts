import { atom } from 'recoil';

interface User {
    uid:string;
}

export const isLoggedInState = atom<boolean>({
    key:'isLoggedIn',
    default: localStorage.getItem('token') ? true : false
});

export const userState = atom<User>({
    key:'user',
    default: { uid:"" }
});