import { GlobalNavigationBarElement } from "router";
import { useRouter } from "hooks/useRouter";
import styled from "styled-components";
import { FlexColumn, FlexRowCenter } from "style/globalStyle";
import { DeviceQuery } from "style/responsive";

type NavigationProps = {
    navigationContent:GlobalNavigationBarElement[],
    toggle:boolean,
    onClickFunc: () => void
}

const GlobalNavigationBar = ({navigationContent,toggle,onClickFunc}:NavigationProps) => {
    const { routeTo, } = useRouter();

    const navigationBarClickHandler = (path:string) => {

        routeTo(path);
    }

    
    return <NavigationWrapper className={toggle ? "on" : ""}>
        <ul>
        {navigationContent.map((item)=>{
            return <li key={item.id} onClick={() => navigationBarClickHandler(item.path)}>
                {item.label}
            </li>
        })}
        <li className="desktop-none" onClick={onClickFunc}>로그아웃</li>
        </ul>
    </NavigationWrapper>
}

const NavigationWrapper = styled.nav`
    ul { 
        ${FlexRowCenter}
    }
    li {
        margin: 0 1rem;cursor: pointer;
    }
    ${DeviceQuery.small`
        position:absolute;top:9rem;left:-4%;z-index:2;width:calc(100vw + 4%);height:100vh;background-color: rgba(0,0,0,.7);visibility: hidden;transition:.2s ease-in-out;
        
        ul {
            ${FlexColumn}
            align-items:flex-start;
            padding:0 8%;width:20%;height:100%;background-color:#000;
            transform:translateX(-100vw);transition:.3s ease-in-out;
        }
        li {
            ${FlexRowCenter}
            height:8rem;font-size:2.5vw;
        }
        &.on { 
            visibility: visible;
            ul {
                transform:translateX(0); 
            }
        
        }
    `}
    ${DeviceQuery.xsmall`
        top:15rem;
        ul { 
            width:50%;
        }
        li { 
            height:15rem;font-size:3.5rem;
        }
    `}
`

export default GlobalNavigationBar;