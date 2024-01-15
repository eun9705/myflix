import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FlexColumnCenterCenter } from "style/globalStyle";
import { useRouter } from "hooks/useRouter";
import Icon from "../components/Icon";

const ContentPlayPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { goBack } = useRouter();

    useEffect(()=>{
        searchParams.get('q');
        setSearchParams(searchParams);
    },[setSearchParams,searchParams]);

    useEffect(()=>{
        document.body.classList.remove('off-scroll');
    },[]);

    return <CotentPlayModalWrapper>
        <button className="close-btn" onClick={()=>goBack(2)}>
            <Icon icon="arrow"/>
        </button>
        <Iframe
            src={`https://www.youtube.com/embed/${searchParams.get('q')}?controls=0&autoplay=1&mute=1&loop=1&mute=1&playlist=${searchParams.get('q')}`}
            width="640"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen"
        ></Iframe>
    </CotentPlayModalWrapper>
}
const CotentPlayModalWrapper = styled.div`
    position: absolute;left:0;top:0;width:100%;height:100%;z-index:10;
    background-color: black;
    .close-btn {
        position: absolute;left:15px;top:10px;z-index:2;
        ${FlexColumnCenterCenter}
        width: 5rem;height:5rem;
        background-color:#333;
        /* border-radius:50%; */
        transform:rotate(180deg);
        /* svg {
            width: 4rem;height:4rem;
        } */
    }
`

const Iframe = styled.iframe`
    position: absolute;left:0;top:0;
    width:100%;height:100%;
`

export default ContentPlayPage;