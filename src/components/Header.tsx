import { ChangeEvent, useCallback, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { isLoggedInState, userState } from 'atom/login';
import { authService } from 'firebase/firebase';
import { signOut } from 'firebase/auth';
import styled from "styled-components";
import { FlexRow, FlexRowCenter, FlexRowSpaceBetween } from "style/globalStyle";
import { useRouter } from 'hooks/useRouter';
import { useScroll } from "hooks/useScroll";
import { useDebounce } from "hooks/useDebounce";
import { GlobalNavigationBarContent } from "router";
import GlobalNavigationBar from "./GlobalNavigationBar";
import BasicButton from "./BasicButton";
import Icon from './Icon';
import logo from "assets/logo.svg";

const Header = () => {
    const setIsLoginState = useSetRecoilState(isLoggedInState);
    const setUserState = useSetRecoilState(userState);
    const { currentUrl,routeTo } = useRouter();

    const logout = useCallback(async() => {
        const checkoutLogout = window.confirm('로그아웃 하시겠습니까?');
        if(!checkoutLogout) return;
        try {
            await signOut(authService);
            setIsLoginState(false);
            setUserState({uid:""});
            localStorage.removeItem('token');
            routeTo('/');
        }catch(error) {
            console.log(error);
        }
    },[]);

    const sendQuery = (event:ChangeEvent<HTMLInputElement>) => {
        routeTo(`/search?q=${event.currentTarget.value}`);
    }  

    const { scrollY }  = useScroll();
    const debouncedScollY = useDebounce(scrollY,300);
    const isLogIn = useRecoilValue(isLoggedInState);

    useEffect(()=>{
        // document.getElementById('header-input').value = '';
    },[currentUrl]);
    return <HeaderWrapper className={debouncedScollY > 30 ? "on" : ""}>
        <Link to={'/'}><img src={logo} alt="로고" /></Link>
        {isLogIn ? <GlobalNavigationBar navigationContent={GlobalNavigationBarContent}/>: <BasicButton name="로그인" size="small" onClickFunc={()=>routeTo('/login')} />}
        {isLogIn && <RightSideWrapper>
            <SearchWrapper>
                <Icon icon='search' />
                <input type="text" onChange={sendQuery} placeholder='제목, 사람, 장르' id='header-input'/>
            </SearchWrapper>
            <BasicButton name='로그아웃' onClickFunc={()=>logout()} size="small"/>
        </RightSideWrapper>}
    </HeaderWrapper>
}

const HeaderWrapper = styled.header`
    ${FlexRowSpaceBetween}
    position: fixed;z-index:2;width:100vw;height:6.8rem;padding:0 4%;box-sizing:border-box;
    background: linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent);transition:background .3s ease-in-out;
    &.on {
        background-color: ${({theme})=>theme.colorVariant.black900};
    }
`

const RightSideWrapper = styled.div`
    ${FlexRow}
`

const SearchWrapper = styled.div`
    ${FlexRowCenter};margin-right:1rem;gap:2%;padding-left:2%;
    background: rgba(0,0,0,.75);border:1px solid hsla(0,0%,100%,.85);
    input { max-height:30px;background: transparent;border: none;box-sizing: border-box;color: #fff;display: inline-block;font-size: 14px;outline: none;padding: 7px 14px 7px 7px;width: 212px; }
`

export default Header;