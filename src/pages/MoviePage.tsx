import { requests } from "api/requests";
import RepresentativeImage from "components/RepresentativeImage";
import ContentRow from "components/ContentRow";

const MoviePage = () => {
    return <section>
        <RepresentativeImage genres="movie"/>
        <ContentRow title="지금 뜨는 콘텐츠" fetchUrl={requests.getTrendingMovie}/>
        <ContentRow title="액션 영화" fetchUrl={requests.getActionMovie}/>
        <ContentRow title="코미디 영화" fetchUrl={requests.getComedyMovie}/>
        <ContentRow title="판타지 영화" fetchUrl={requests.getFantasyMovie}/>
        <ContentRow title="로맨스 영화" fetchUrl={requests.getRomanceMovie}/>
        <ContentRow title="애니메이션" fetchUrl={requests.getAnimation}/>
    </section>
}

export default MoviePage;