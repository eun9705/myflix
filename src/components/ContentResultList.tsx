import { useState } from "react";
import styled from "styled-components";
import { ContentInfoType } from "types/movie";
import DetailModal from "./DetailModal";

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
        {viewModal && <DetailModal selectedContent={selectedMovie} onClickFunc={closeModal} />}
    </SearchResultListWrapper>
}

const SearchResultListWrapper = styled.div`
    > ul {
        display: grid;grid-template-columns: repeat(4,1fr);gap: 8px;width: 100%;margin-top:10px;
    }
    img { min-width:232px;height:12.5vw;object-fit:cover; }
`

export default ContentResultList;