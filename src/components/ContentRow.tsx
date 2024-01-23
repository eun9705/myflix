import { useCallback, useEffect, useState } from "react";
import { instance } from "api/axios";
import styled from "styled-components";
import { Swiper,SwiperSlide } from "swiper/react";
import 'swiper/css';
import { ContentInfoType } from "types/movie";
import DetailModal from "./DetailModal";
import { DeviceQuery } from "style/responsive";
import axios from "axios";
import { tmdbError } from "api/tmdbError";

type MovieRowProps = {
    title:string,
    fetchUrl:string,
    id?:string
}

const ContentRow = ({title,fetchUrl}:MovieRowProps) => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [movieList,setMovieList] = useState<ContentInfoType[]>([]);
    const [selectedContent,setSelectedContent] = useState<ContentInfoType>();
    const getMovieData = useCallback(async () => {
        try {
            const res = await instance.get(fetchUrl,{
                params: { 
                    append_to_response: "videos" 
                }
            });
            setMovieList(res.data.results);
        }catch(error) {
            if(axios.isAxiosError(error)) {
                tmdbError(error.response?.data.status_code);
            }else {
                alert('네트워크 오류 또는 서버 응답 없음');
            }
        }
    },[fetchUrl]);

    useEffect(()=>{
        getMovieData();
    },[getMovieData]);

    const openModal = (selectedContentProps:ContentInfoType) => {
        setIsOpen(true);
        document.body.classList.add('off-scroll');
        setSelectedContent(selectedContentProps);
    }

    const closeModal = useCallback(() => {
        setIsOpen(false)
        document.body.classList.remove('off-scroll');
    },[]);

    return <MovieListWrapper>
        <h2>{title}</h2>
        <Swiper
            loop={true}
            loopAddBlankSlides={true}
            breakpoints={{
                1441: {
                    slidesPerView: 6, 
                    slidesPerGroup: 5,
                },
                1181: {
                    slidesPerView: 5, 
                    slidesPerGroup: 4,
                },
                821: {
                    slidesPerView: 4,
                    slidesPerGroup: 3,
                },
                0: {
                    slidesPerView: 3, 
                    slidesPerGroup: 2,
                },
            }}
        >
            {movieList.map((movieItem) => {
                return <SwiperSlide className="slider" key={movieItem.id}>
                    <ImgWrapper onClick={()=>openModal(movieItem)}>
                        <img src={`https://image.tmdb.org/t/p/original/${movieItem?.poster_path}`} alt={movieItem.name} />
                    </ImgWrapper>
                </SwiperSlide>
            })}
        </Swiper>
        {(selectedContent && isOpen) && <DetailModal selectedContent={selectedContent} onClickFunc={closeModal}/>}
    </MovieListWrapper>
}

const MovieListWrapper = styled.article`
    margin:3vw 0;overflow-x: visible;
    .swiper-horizontal { padding:0 4%; }
    h2 { margin-bottom:.5em;padding-left:4%;font-size:1.4vw; }
    ${DeviceQuery.small`
        margin:5vw 0;
        h2 { font-size:2.5rem; }
    `} 
    ${DeviceQuery.xsmall`
        h2 { font-size:3.5rem; }
    `} 
`

const ImgWrapper = styled.div`
    position: relative;
    width:97%;height:22vw;
    img { object-fit:cover;width:100%;min-height:100%;border-radius:2px; }   
    ${DeviceQuery.large`
        height:25vw;
    `}
    ${DeviceQuery.medium`
        height:32vw;
    `}
    ${DeviceQuery.small`
        height:40vw;
    `}
`

export default ContentRow;