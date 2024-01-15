import { useEffect, useState } from "react";
import styled from "styled-components";
import { requests } from "api/requests";
import { instance } from "api/axios";
import { ContentInfoType } from "types/movie";
import { FlexColumnCenter, FlexRowCenter, Font700 } from "style/globalStyle";
import { useRouter } from "hooks/useRouter";
import BasicButton from "./BasicButton";
import DetailModal from "./DetailModal";

type RepresentativeImageProps = {
    genres:string
}

const RepresentativeImage = ({genres}:RepresentativeImageProps)=> {
    const { routeTo } = useRouter();
    const [contentInfo,setContentInfo] = useState<ContentInfoType | null>(null);
    const [viewDetailModal,setDetailModal] = useState<boolean>(false);
    const apiUrl = genres === 'movie' ? requests.getNowPlayingMovie : requests.getNowPlayingTv;

    const getNotPlayingMovieData = async () => {
        const res = await instance.get(apiUrl);
        const contentId = res.data.results[
            Math.floor(Math.random() * res.data.results.length)
        ].id;
      
        
        const { data: movieDetail } = await instance.get(`${genres}/${contentId}`, {
            params: { 
                append_to_response: "videos" 
            }
        });
        
        setContentInfo(movieDetail);
    }

    const truncatOverview = (str:string | undefined,cutNum:number) => {
        return str !== undefined ? str?.length > cutNum ? str.substring(0, cutNum) + "..." : str : null;
    };

    const openDetailModal = () => {
        document.body.classList.add('off-scroll');
        setDetailModal(true);
    }

    const closeDetailModal = () => {
        document.body.classList.remove('off-scroll');
        setDetailModal(false);
    }

    useEffect(()=>{
        getNotPlayingMovieData();
    },[]);
    
    return (
        <>
            <RepresentativeImageWrapper background={`https://image.tmdb.org/t/p/original/${contentInfo?.backdrop_path}`}>
                <TextWrapper>
                    <h1>{contentInfo?.title || contentInfo?.name || contentInfo?.original_name}</h1>
                    <p>{truncatOverview(contentInfo?.overview,100)}</p>
                    <ButtonWrapper>
                        {contentInfo?.videos?.results.length !== 0 && <BasicButton name="재생" onClickFunc={()=>{routeTo(`/watch?q=${contentInfo?.videos?.results[0].key}`)}} bgcolor="#FFF" color="#333" icon="play"/>}
                        <BasicButton name="상세 정보" onClickFunc={openDetailModal} bgcolor="#555" icon="info"/>
                    </ButtonWrapper>
                </TextWrapper>
            </RepresentativeImageWrapper>
            {viewDetailModal && <DetailModal selectedContent={contentInfo!} onClickFunc={closeDetailModal}/>}
        </>
    )
}

const RepresentativeImageWrapper = styled.div<{background:string}>`
    position: relative;
    height: 56.2vw;
    background: url(${props => props.background}) no-repeat center / cover;
    ${FlexColumnCenter};
    &::before {
        position: absolute;left:0;bottom:0;content:'';display:block;width:100%;height:100%;background:linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%);
    }
    &:after {
        position: absolute;left:0;bottom:-1px;content: '';display:block;width:100%;height:14.7vw;background:linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414) repeat-x 0 top;
    }
`

const TextWrapper = styled.div`
    position: relative;top:-7.35vw;z-index:1;width:40%;height:14.7vw;padding-left:4%;box-sizing:border-box;
    h1 { 
        ${Font700} 
        font-size: 3vw;
    }
    p { 
        margin: 4rem 0 3rem;
        font-size:1.2vw; 
    }
`

const ButtonWrapper = styled.div`
    ${FlexRowCenter};
    gap: 8px;
`

export default RepresentativeImage;