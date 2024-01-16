import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface User {
    uid:string;
}

export const isLoggedInState = atom<boolean>({
    key:'isLoggedIn',
    default: localStorage.getItem('token') ? true : false
});

export const userState = atom<User>({
    key:'user',
    default: { uid:"" },
    effects_UNSTABLE: [persistAtom],
});