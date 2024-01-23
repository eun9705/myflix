import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useRecoilValue,useSetRecoilState } from 'recoil';
import axios from 'axios';
import { isLoggedInState, userState } from 'atom/login';
import { authService } from 'firebase/firebase';
import { signOut } from 'firebase/auth';
import { tmdbError } from 'api/tmdbError';
import styled from "styled-components";
import { FlexRow, FlexRowCenter, FlexRowSpaceBetween } from "style/globalStyle";
import { DeviceQuery } from 'style/responsive';
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
    const { routeTo,currentUrl } = useRouter();
    const [toggle,setToggle] = useState<boolean>(false);

    const logout = useCallback(async() => {
        try {
            await signOut(authService);
            setIsLoginState(false);
            setUserState({uid:""});
            localStorage.removeItem('token');
            routeTo('/');
        }catch(error){
            if(axios.isAxiosError(error)) {
                tmdbError(error.response?.data.status_code);
            }else {
                alert('네트워크 오류 또는 서버 응답 없음');
            }
        }
    },[]);

    const sendQuery = (event:ChangeEvent<HTMLInputElement>) => {
        routeTo(`/search?q=${event.currentTarget.value}`);
        if(event.currentTarget.value === '') routeTo('/movie');
    }  

    const { scrollY }  = useScroll();
    const debouncedScollY = useDebounce(scrollY,100);
    const isLogIn = useRecoilValue(isLoggedInState);

    useEffect(()=>{
        setToggle(false);
        const inputEl:HTMLInputElement = document.getElementById('header-input') as HTMLInputElement;
        if(inputEl !== null) inputEl.value = '';
    },[currentUrl]);
    
    return <HeaderWrapper className={(debouncedScollY > 30 || toggle) ? "on" : ""}>
        <LeftSideWrapper>
            {isLogIn && <button onClick={()=>setToggle(!toggle)} className='desktop-none'>
                <Icon icon="hamburger" />
            </button>}
            <Link to={'/'}><img src={logo} alt="로고" /></Link>
        </LeftSideWrapper>
        {isLogIn ? <GlobalNavigationBar navigationContent={GlobalNavigationBarContent} toggle={toggle} onClickFunc={logout} />: <BasicButton name="로그인" size="small" onClickFunc={()=>routeTo('/login')} />}
        {isLogIn && <RightSideWrapper>
            <SearchWrapper>
                <Icon icon='search' />
                <input type="text" onChange={sendQuery} placeholder='제목, 장르' id='header-input'/>
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
    ${DeviceQuery.medium`
        height:9rem;
    `}
     ${DeviceQuery.xsmall`
        height:15rem;
    `}
`

const LeftSideWrapper = styled.div`
    ${FlexRowCenter}
    button { min-height:27px;background-color:transparent; } 
    img { display:block; }
`

const RightSideWrapper = styled.div`
    ${FlexRow}
    ${DeviceQuery.small`
        > button { display:none; }
    `}
`

const SearchWrapper = styled.div`
    ${FlexRowCenter};margin-right:1rem;gap:2%;padding-left:2%;
    background: rgba(0,0,0,.75);border:1px solid hsla(0,0%,100%,.85);
    input { max-height:30px;background: transparent;border: none;box-sizing: border-box;color: #fff;display: inline-block;font-size: 14px;outline: none;padding: 7px 14px 7px 7px;width: 212px; }
    ${DeviceQuery.xsmall`
        width:100px;
    `}
`

export default Header;