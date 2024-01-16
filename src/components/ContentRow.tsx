import { useCallback, useEffect, useState } from "react";
import { instance } from "api/axios";
import styled from "styled-components";
import { Swiper,SwiperSlide } from "swiper/react";
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import 'swiper/css';
import { ContentInfoType } from "types/movie";
import DetailModal from "./DetailModal";

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
        const res = await instance.get(fetchUrl,{
            params: { 
                append_to_response: "videos" 
            }
        });
        setMovieList(res.data.results);
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
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            loop={true}
            navigation 
            pagination={{clickable: true}}
            breakpoints={{
                1440: {
                    slidesPerView: 6, 
                    slidesPerGroup: 6,
                },
                1180: {
                    slidesPerView: 5, 
                    slidesPerGroup: 5,
                },
                820: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
                0: {
                    slidesPerView: 3, 
                    slidesPerGroup: 3,
                },
            }}
        >
            {movieList.map((movieItem) => {
                return <SwiperSlide className="slider">
                    <ImgWrapper onClick={()=>openModal(movieItem)}>
                        <img key={movieItem.id} src={`https://image.tmdb.org/t/p/original/${movieItem?.poster_path}`} alt={movieItem.name} />
                    </ImgWrapper>
                </SwiperSlide>
            })}
        </Swiper>
        {(selectedContent && isOpen) && <DetailModal selectedContent={selectedContent} onClickFunc={closeModal}/>}
    </MovieListWrapper>
}

const MovieListWrapper = styled.article`
    margin:5vw 0;overflow-x: visible;
    .swiper-horizontal { padding:0 4%; }
    h2 { margin-bottom:.5em;padding-left:4%; }
`

const ImgWrapper = styled.div`
    position: relative;
    width:97%;height:22vw;
    img { object-fit:cover;width:100%;min-height:100%;border-radius:2px; }   
`

export default ContentRow;