import { useCallback, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "atom/login";
import styled from "styled-components";
import { CommonInput, CommonPageWrapper, FlexColumn, FlexRowCenterCenter, Font700 } from "style/globalStyle";
import { useRouter } from "hooks/useRouter";
import BasicButton from "components/BasicButton";
import { DeviceQuery } from "style/responsive";

const Home = () => {
    const loginStatus = useRecoilValue(isLoggedInState);
    const { routeTo } = useRouter();
    const emailInpuf = useRef<HTMLInputElement>(null);
    
    
    const checkLoginStatus = useCallback(async () => {
        if (loginStatus) {
            routeTo('/movie');
            return;
        }
      }, [routeTo])

    useEffect(()=>{
        checkLoginStatus();
    },[checkLoginStatus]); 

    return <CommonPageWrapper>
        <TextWrapper>
            <h1>영화, 시리즈 등을 무제한으로</h1>
            <p>
                어디서나 자유롭게 시청하세요. 해지는 언제든 가능합니다.<br />
                시청할 준비가 되셨나요? 멤버십을 등록하려면 이메일 주소를 입력하세요.
            </p>
            <InputButtonWrapper>
                <CommonInput type="text" placeholder="이메일 주소" width="35vw" ref={emailInpuf}/>
                <BasicButton name="시작하기" height="4.77rem" onClickFunc={()=>routeTo('/sign-up',emailInpuf.current?.value)} bgcolor="#FFF" icon="angleBracket" color="#333"/>
            </InputButtonWrapper>
        </TextWrapper>
    </CommonPageWrapper>
}

const TextWrapper = styled.div`
    position: relative;z-index:1;text-align:center;width:100%;
    h1 { 
        ${Font700} 
        font-size: 3vw;
    }
    p { margin:3rem 0;line-height:2em;font-size:1.5vw; }
    input { margin-right:2rem; }

    ${DeviceQuery.small`
        ${FlexColumn};
        h1 { font-size:4vw; }
        p { font-size:3vw; }
    `}
`
const InputButtonWrapper = styled.div`
    ${FlexRowCenterCenter};
    > button {
        display: flex;flex-direction:row-reverse;
    }
    ${DeviceQuery.small`
        ${FlexColumn};
        > input {
            width: 50%;
        }
        > button { margin-top:10px; }
    `}
    ${DeviceQuery.xsmall`
        width:60%;
    `}
`

export default Home;