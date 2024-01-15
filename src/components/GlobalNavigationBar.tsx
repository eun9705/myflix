import { GlobalNavigationBarElement } from "router";
import { useRouter } from "hooks/useRouter";
import styled from "styled-components";
import { FlexRowCenter } from "style/globalStyle";

type NavigationProps = {
    navigationContent:GlobalNavigationBarElement[]
}

const GlobalNavigationBar = ({navigationContent}:NavigationProps) => {
    const { routeTo } = useRouter();

    const navigationBarClickHandler = (path:string) => {
        routeTo(path);
    }
    
    return <NavigationWrapper>
        <ul>
        {navigationContent.map((item)=>{
            return <li key={item.id} onClick={() => navigationBarClickHandler(item.path)}>
                {item.label}
            </li>
        })}
        </ul>
    </NavigationWrapper>
}

const NavigationWrapper = styled.nav`
    ul { 
        ${FlexRowCenter} 
    }
    li {
        margin: 0 1rem;
    }
`

export default GlobalNavigationBar;