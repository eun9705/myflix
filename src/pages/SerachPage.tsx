import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components"
import axios from "axios";
import { tmdbError } from "api/tmdbError";
import { instance } from "api/axios";
import { requests } from "api/requests";
import { useDebounce } from "hooks/useDebounce";
import { ContentInfoType } from "types/movie";
import ContentResultList from "components/ContentResultList";



const SearchPage = () => {
    const [serachData,setSearchData] = useState<ContentInfoType[]>([]);
    const [searchParams,setSearchParams] = useSearchParams();
    const debouncedValue = useDebounce(searchParams.get('q'),500);

    const fetchMovie = async() => {
        try {
            const res = await instance.get(requests.getSearchMovie,{
                params: {
                    query:debouncedValue
                }
            });
            let values = [];
            const filter = res.data.results.map((movieItem:ContentInfoType) =>({
                ...movieItem,category:'movie'
            }));
            values = [...filter];
            return values;
        }catch(error){
            if(axios.isAxiosError(error)) {
                tmdbError(error.response?.data.status_code);
            }else {
                alert('네트워크 오류 또는 서버 응답 없음');
            }
            return null;
        }
    }

    const fetchTv = async() => {
        try {
            const res = await instance.get(requests.getSearchTv,{
                params: {
                    query:debouncedValue
                }
            });
            let values = [];
            const filter = res.data.results.map((tvItem:ContentInfoType) =>({
                ...tvItem,category:'tv'
            }));
            values = [...filter];
            return values;
        }catch(error){
            if(axios.isAxiosError(error)) {
                tmdbError(error.response?.data.status_code);
            }else {
                alert('네트워크 오류 또는 서버 응답 없음');
            }
            return null;
        }
    }

    const concatArr = async () => {
        const movieArr = await fetchMovie();
        const tvArr = await fetchTv();
        if(movieArr !== null && tvArr !== null) {
            const dataArr = movieArr!.concat(tvArr!);
            setSearchData(dataArr);
        }
        if(movieArr !==null && tvArr === null) setSearchData(movieArr);
        if(movieArr ===null && tvArr !== null) setSearchData(tvArr);
    }

    useEffect(()=>{
        searchParams.get('q');
        setSearchParams(searchParams);
    },[setSearchParams,searchParams]);

    useEffect(()=>{
        concatArr();
    },[debouncedValue]);

    
    return <SearchPageWrapper>
        <h3>검색결과</h3>
        <ContentResultList resultContent={serachData}/>
    </SearchPageWrapper>
}

const SearchPageWrapper = styled.section`
    padding: 12rem 4% 0;
    h3 { font-size:2.4rem; }
`


export default SearchPage;