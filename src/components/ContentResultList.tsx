import { useState } from "react";
import styled from "styled-components";
import { ContentInfoType } from "types/movie";
import DetailModal from "./DetailModal";
import { DeviceQuery } from "style/responsive";

type ContentResultListProps = {
    resultContent:ContentInfoType[];
}

const ContentResultList = ({resultContent}:ContentResultListProps) => {
    const [viewModal,setViewModal] = useState<boolean>(false);
    const [selectedMovie,setSelectedMovie] = useState<ContentInfoType>();

    const openModal = (selectedMovieProps:ContentInfoType) => {
        setViewModal(true);
        document.body.classList.add('off-scroll');
        setSelectedMovie(selectedMovieProps);
    }

    const closeModal = () => {
        setViewModal(false);
        document.body.classList.remove('off-scroll');
    }
    
    return <SearchResultListWrapper>
        <ul>
            {resultContent.map((contentItem)=>{
                return <li onClick={()=>{openModal(contentItem)}}>
                    <img key={contentItem.id} src={`https://image.tmdb.org/t/p/original/${contentItem?.backdrop_path}`} alt={contentItem.name || contentItem.title || contentItem.original_name} />
                </li>
            })}
        </ul>
        {(selectedMovie && viewModal) && <DetailModal selectedContent={selectedMovie} onClickFunc={closeModal} />}
    </SearchResultListWrapper>
}

const SearchResultListWrapper = styled.div`
    > ul {
        display: grid;grid-template-columns: repeat(4,1fr);gap: 8px;width: 100%;margin-top:10px;
    }
    img { min-width:200px;height:12.5vw;object-fit:cover; }
    ${DeviceQuery.medium`
        > ul { 
            grid-template-columns: repeat(3,1fr);
        }
        img { min-width:auto;width:100%;height:100%; }
    `}
    ${DeviceQuery.xsmall`
        > ul { 
            grid-template-columns: repeat(2,1fr);
        }
    `}
`

export default ContentResultList;