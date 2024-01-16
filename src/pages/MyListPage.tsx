import { useEffect, useState } from "react";
import axios from "axios";
import { tmdbError } from "api/tmdbError";
import { instance } from "api/axios";
import styled from "styled-components";
import { ContentInfoType } from "types/movie";
import { useRecoilValue } from "recoil";
import { userState } from "atom/login";
import ContentResultList from "components/ContentResultList";
import { db } from "firebase/firebase";
import { doc, getDoc } from "firebase/firestore";


const MyListPage = () => {
    const [favoriteData,setFavoriteData] = useState<ContentInfoType[]>([]);
    const useStatus = useRecoilValue(userState);

    const fetchMovie = async(movieArr:number[]) => {
        if(movieArr === undefined) return null;
        const movieValue: ContentInfoType[] = await Promise.all(
            movieArr.map(async (movieItem) => {
                try {
                    const res = await instance.get(`movie/${movieItem}`);
                    res.data['category'] = 'movie';
                    return res.data;
                } catch(error){
                    if(axios.isAxiosError(error)) {
                        tmdbError(error.response?.data.status_code);
                    }else {
                        alert('네트워크 오류 또는 서버 응답 없음');
                    }
                    return null;
                }
            })
        );
        return movieValue.filter((item) => item !== null); 
    }

    const fetchTv = async(tvArr:number[]) => {
        if(tvArr === undefined) return null;
        const tvValue: ContentInfoType[] = await Promise.all(
            tvArr.map(async (tvItem) => {
                try {
                    const res = await instance.get(`tv/${tvItem}`);
                    res.data['category'] = 'tv';
                    return res.data;
                } catch(error){
                    if(axios.isAxiosError(error)) {
                        tmdbError(error.response?.data.status_code);
                    }else {
                        alert('네트워크 오류 또는 서버 응답 없음');
                    }
                    return null;
                }
            })
        );
        return tvValue.filter((item) => item !== null); 
    }

    const loadFavoriteList = async () => {
        const favorites = doc(db, 'favorites', useStatus.uid);
        const res = await getDoc(favorites);
        
        if(!res.exists()) {
            return null;
        }
        const movieData:ContentInfoType[] | null = await fetchMovie(res.data()?.movie);
        const tvData:ContentInfoType[] | null = await fetchTv(res.data().tv);
        if(movieData !== null && tvData !== null) {
            const dataArr = movieData!.concat(tvData!);
            setFavoriteData(dataArr);
        }
        if(movieData !==null && tvData === null) setFavoriteData(movieData);
        if(movieData ===null && tvData !== null) setFavoriteData(tvData);
    }

    useEffect(()=>{
        loadFavoriteList();
    },[]);

    return <MyListPageWrapper>
        <h3>내가 찜한 콘텐츠</h3>
        <ContentResultList resultContent={favoriteData}/>
    </MyListPageWrapper>
}

const MyListPageWrapper = styled.section`
    padding: 12rem 4% 0;
    h3 { font-size:2.4rem; }
`

export default MyListPage;