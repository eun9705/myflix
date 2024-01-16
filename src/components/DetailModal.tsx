import { useCallback, useEffect,useState } from "react";
import axios from "axios";
import { tmdbError } from "api/tmdbError";
import { instance } from "api/axios";
import { useRouter } from "hooks/useRouter";
import { useRecoilValue } from "recoil";
import { userState } from "atom/login";
import { db } from "firebase/firebase";
import styled from "styled-components";
import { FlexColumn, FlexColumnCenter, FlexColumnCenterCenter, FlexRow, FlexRowCenter, Font700 } from "style/globalStyle";
import { ContentInfoType, CreditsType, DetailInfoType, GenresType } from "types/movie";
import BasicButton from "./BasicButton";
import Icon from "./Icon";
import IconButton from "./IconButton";
import { arrayRemove, arrayUnion, doc,getDoc, setDoc } from "firebase/firestore";


type DetailProps = {
    selectedContent:ContentInfoType;
    onClickFunc:() => void,
}

const DetailModal = ({selectedContent,onClickFunc}:DetailProps) => {
    const [detailInfo,setDetailInfo] = useState<DetailInfoType>();
    const [credits,setCredits] = useState<CreditsType[]>();
    const [genres,setGenres] = useState<GenresType[]>();
    const [viewAll,setViewAll] = useState<boolean>(false);
    const [contentIdArr,setContentIdArr] = useState<number[]>([]);
    const { currentUrl,routeTo } = useRouter();
    const useStatus = useRecoilValue(userState);
    const { title,id,original_name,name,overview }:ContentInfoType = selectedContent;
    
    let category:string = '';
    if(selectedContent?.category !== undefined) {
        category = selectedContent.category;
    }
    else {
        category = currentUrl === '/movie' ? "movie" : "tv";
    }


    const getDetail = async () => {
        try{
            const { data } = await instance.get(`${category}/${id}`,{
                params: { 
                    append_to_response: "videos,credits"
                }
            });
            setDetailInfo(data);
            setCredits(data.credits.cast);
            setGenres(data.genres);
        }catch(error){
            if(axios.isAxiosError(error)) {
                tmdbError(error.response?.data.status_code);
            }else {
                alert('네트워크 오류 또는 서버 응답 없음');
            }
        }
    }

    const fetchMovie = async() => {
        const favorites = doc(db, 'favorites', useStatus.uid);
        try {
            const res = await getDoc(favorites);
            return res.data()?.movie === undefined ? null : res.data()?.movie;
        }catch(error){
            if(axios.isAxiosError(error)) {
                tmdbError(error.response?.data.status_code);
            }else {
                alert('네트워크 오류 또는 서버 응답 없음');
            }
        }
    }

    const fetchTv = async() => {
        const favorites = doc(db, 'favorites', useStatus.uid);
        try {
            const res = await getDoc(favorites);
            return res.data()?.tv === undefined ? null : res.data()?.tv;
        }catch(error){
            if(axios.isAxiosError(error)) {
                tmdbError(error.response?.data.status_code);
            }else {
                alert('네트워크 오류 또는 서버 응답 없음');
            }
        }
    }

    const concatArr = async () => {
        const movieArr = await fetchMovie();
        const tvArr = await fetchTv();
        const dataArr = movieArr.concat(tvArr);
        setContentIdArr(dataArr);
    }

    useEffect(()=>{
        getDetail();
    },[]);

    useEffect(()=>{
        concatArr();
    },[]);

    const addFavorite = useCallback(async () => {
        const favorites = doc(db, 'favorites', useStatus.uid);
        try {
            let params = { };
            category === 'movie' ? params = { movie:arrayUnion(id) } : params = {tv:arrayUnion(id)};
            await setDoc(favorites,params, { merge:true });
            concatArr();
        }catch(error){
            if(axios.isAxiosError(error)) {
                tmdbError(error.response?.data.status_code);
            }else {
                alert('네트워크 오류 또는 서버 응답 없음');
            }
        }
    },[]);

    const deleteFavorite = useCallback(async()=>{
        const favorites = doc(db, 'favorites', useStatus.uid);try {
            let params = { };
            category === 'movie' ? params = { movie:arrayRemove(id) } : params = {tv:arrayRemove(id)};
            await setDoc(favorites,params, { merge:true });
            concatArr();
        }catch(error){
            if(axios.isAxiosError(error)) {
                tmdbError(error.response?.data.status_code);
            }else {
                alert('네트워크 오류 또는 서버 응답 없음');
            }
        }
    },[]);

    return (
        <MovieDetailModalWrapper>
            <ScrollArea>
                <MovideModalContent className={viewAll ? "height-change" : ""}>
                    <button className="close-btn" onClick={onClickFunc}>
                        <Icon icon="plus"/>
                    </button>
                    <TitleArea background={`https://image.tmdb.org/t/p/original/${detailInfo?.backdrop_path}`}>
                        <article>
                            <h3>{title || original_name || name}</h3>
                            <ButtonWrapper>
                                {detailInfo?.videos?.results.length !== 0 && <BasicButton name="재생" icon="play" color="#333" bgcolor="#FFF" onClickFunc={()=>routeTo(`/watch?q=${detailInfo?.videos?.results[0].key}`)}/>}
                                {contentIdArr.includes(id) ? <IconButton icon="check" title="내가 찜한 콘텐츠에서 삭제" onClickFunc={deleteFavorite}/> : <IconButton icon="plus" title="내가 찜한 콘텐츠에 추가" onClickFunc={addFavorite}/>}
                            </ButtonWrapper>
                        </article>
                    </TitleArea>
                    <ContentWrapper>
                        {(detailInfo?.seasons || detailInfo?.number_of_episodes) && <div className="info-span">
                            {detailInfo?.seasons && <span className="seasons-span">시즌 {detailInfo?.seasons.length}개</span>}
                        {detailInfo?.number_of_episodes && <span>에피소드 {detailInfo?.number_of_episodes}개</span>}    
                            </div>}
                        <h4>{title || original_name || name} 상세정보</h4>
                        <hr />
                        <p>{overview}</p>
                        <DetailList>
                            <span>장르 : </span>
                            <ul>
                                {genres?.map((genresItem,index)=>{
                                    if(genres.length === (index + 1)) {
                                        return <li key={index}>{genresItem.name}</li>
                                    }
                                    return <li key={index}>{genresItem.name},</li>
                                })}
                            </ul>
                        </DetailList>
                        <DetailList>
                            <span>출연진 : </span>
                            <ul className={viewAll ? "on" : ""}>
                                {credits?.map((creditsItem,index)=>{
                                    if(credits.length === (index + 1)) {
                                        return <li key={index}>{creditsItem.name}</li>
                                    }
                                    return <li key={index}>{creditsItem.name},</li>
                                })}
                            </ul>
                        </DetailList>
                        {(credits && credits.length > 15) && <button className="detail-btn" onClick={()=>{setViewAll(!viewAll)}}>{viewAll ? "닫기" : "더보기"}</button>}
                    </ContentWrapper>
                </MovideModalContent>
            </ScrollArea>
        </MovieDetailModalWrapper>
    )
}

const MovieDetailModalWrapper = styled.div`
    position:fixed;left:0;top:0;z-index:9;width:100%;height:100%;background-color: rgba(0,0,0,.7);
`

const ScrollArea = styled.div`
    ${FlexRow}
    justify-content: center;
    width: 100%;height:100%;overflow-y:scroll;
`

const MovideModalContent = styled.section`
    position: relative;
    width:850px;min-height:900px;background-color:#181818;border-radius:10px;margin-top:60px;
    .close-btn {
        position: absolute;right:15px;top:10px;z-index:2;
        ${FlexColumnCenterCenter}
        width: 5rem;height:5rem;
        background-color:#333;
        border-radius:50%;transform:rotate(45deg);
        svg {
            width: 4rem;height:4rem;
        }
    }
    &.height-change { min-height:1000px; }
`

const TitleArea = styled.div<{background:string}>`
    position:relative;
    ${FlexColumnCenter}
    width:100%;height:500px;padding:0 4%;box-sizing:border-box;background: url(${props => props.background}) no-repeat top center / cover;
    &::before {
        position: absolute;left:0;bottom:0;content:'';display:block;width:100%;height:100%;background:linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%);
    }
    &:after {
        position: absolute;left:0;bottom:-1px;content:'';display:block;width:100%;height:14.7vw;background:linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#181818 68%,#181818) repeat-x 0 top;
    }
    article {
        position: relative;z-index: 2;
        h3 {
            font-size: 4rem;
            ${Font700}
        }
    }
`

const ButtonWrapper = styled.div`
    ${FlexRowCenter}      
    gap: 8px;margin-top:5rem;
    
`

const ContentWrapper = styled.article`
    ${FlexColumn};
    padding: 1% 4%;
    .info-span > span {
        display: inline-block;
        font-size: 1.4rem;color:#777;border:1px solid #777;padding:.7%;
        margin-bottom: 10px;
        &.seasons-span {
            background-color: ${({theme})=>theme.colorVariant.mainColor};
            border-color: ${({theme})=>theme.colorVariant.mainColor};
            color:#FFF;margin-right:8px;
        }
    }
    hr { width:100%; }
    h4 { font-size:2.6rem; }
    > p { margin:4rem 0 2rem; }
    .detail-btn { 
        align-self:flex-end;
        padding:.7rem 1rem;border-radius:.5rem;background-color:rgba(0,0,0,.7);font-size: 1.4rem;border:1px solid #777;color:#777;
    }
`
const DetailList = styled.div`
    ${FlexRow}
    gap:4px;
    width: 100%;
    span { color:#777;display:inline-block;min-width:50px; }
    ul {
        display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;margin-bottom: 8px;word-break:break-all;
        &.on { -webkit-line-clamp:unset; }
        li { display: inline; }
    }
`

export default DetailModal;