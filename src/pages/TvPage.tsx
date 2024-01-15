import styled from "styled-components";
import { requests } from "api/requests";
import RepresentativeImage from "components/RepresentativeImage";
import ContentRow from "components/ContentRow";

const TvPage = () => {
    return <TvPageWrapper>
        <RepresentativeImage genres="tv"/>
        <ContentRow title="지금 뜨는 콘텐츠" fetchUrl={requests.getTrendingTv}/>
        <ContentRow title="액션 시리즈" fetchUrl={requests.getActionTv}/>
        <ContentRow title="코미디 시리즈" fetchUrl={requests.getComedyTv}/>
        <ContentRow title="리얼리티" fetchUrl={requests.getFantasyTv}/>
        <ContentRow title="로맨스 시리즈" fetchUrl={requests.getRomanceTv}/>
        <ContentRow title="애니메이션" fetchUrl={requests.getAnimationTv}/>
    </TvPageWrapper>
}

const TvPageWrapper = styled.section`
    
`

export default TvPage;