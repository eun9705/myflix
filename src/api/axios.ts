import axios from "axios";

const { VITE_APP_TMDB_ACCESS_TOKEN } = import.meta.env;

export const instance = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    timeout:3000,
    headers: {
        Authorization: `Bearer ${VITE_APP_TMDB_ACCESS_TOKEN}`
    },
    params: {
        language: 'ko-KR'
    }
})