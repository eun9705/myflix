import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "firebase/firebase";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState, userState } from "atom/login";
import { useRouter } from "hooks/useRouter";
import styled from "styled-components";
import { CommonInput, CommonPageWrapper, FlexColumn, Font500 } from "style/globalStyle";
import BasicButton from "components/BasicButton";

const loginFormData = {
    title:'로그인',
    text:'계정이 없으신가요?',
    linkText:'가입하기',
    url:'/sign-up',
}

const signUpFormData = {
    title:'회원가입',
    text:'계정이 이미 있으신가요?',
    linkText:'로그인하기',
    url:'/login'
}

const FormPage = () => {
    const location = useLocation();
    const signUpProps = {...location.state};
    const setIsLoginState = useSetRecoilState(isLoggedInState);
    const setUserState = useSetRecoilState(userState);
    const loginStatus = useRecoilValue(isLoggedInState);
    const { currentUrl,routeTo } = useRouter();
    const data = currentUrl === '/login' ? loginFormData : signUpFormData;
    const { title,text,url,linkText } = data;
    const emailRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);

    //ref 초기화
    const clearRef = () => {
        emailRef.current!.value = '';
        pwRef.current!.value = '';
    }

    //정규식
    const regExpression = async (emailStr:string|undefined,pwStr:string|undefined) => {
        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i 
        const pwRegex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if(emailRegex.test(emailStr!) && pwRegex.test(pwStr!)) return true;
        return false;
    }

    //회원가입
    const onSingUpSubmit = useCallback(async() => {
        const emailValue = emailRef.current!.value;
        const pwValue = pwRef.current!.value;
        const res = await regExpression(emailValue,pwValue);
        if(!res) {
            clearRef();
            alert('회원가입에 실패했습니다.');
            return;
        }
        try {
            const { user } = await createUserWithEmailAndPassword(authService,emailValue,pwValue)
            if(typeof(user) === 'object') {
                emailRef.current!.value = '';
                pwRef.current!.value = '';
                alert(`회원가입을 축하합니다!\n로그인 후 마이플릭스를 즐겨보세요`);
                routeTo('/login');
            }
        }catch(error) {
            console.log(error);
        }
    },[]);

    const onLoginSubmit = useCallback(async() => {
        const emailValue = emailRef.current!.value;
        const pwValue = pwRef.current!.value;
        try {
            const { user } = await signInWithEmailAndPassword(authService,emailValue,pwValue);
            const idTokenResult = await user.getIdTokenResult();

            const { uid } = user || {};
            if(user) {
                localStorage.setItem('token',idTokenResult.token);
                setIsLoginState(true);
                setUserState({uid:uid});
                return;
                routeTo('/movie');
                
            }
        }catch(error) {
            console.log(error);
        }

    },[]);

    //로그인 되어있는 유저인지 확인
    const checkLoginStatus = useCallback(async () => {
        if (loginStatus) {
            routeTo('/movie');
            return;
        }
    }, [routeTo]);
    
    useEffect(() => {
    checkLoginStatus()
    }, [checkLoginStatus])

    const enterHandler = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            if(currentUrl === '/login') onLoginSubmit();
            else onSingUpSubmit();
        }
    }

    useLayoutEffect(()=>{
        if(signUpProps.params !== undefined) emailRef.current!.value = signUpProps.params;
    },[]);

    return <CommonPageWrapper>
        <FormContent>
            <h2>{title}</h2>
            <CommonInput type="text" name="email" placeholder="이메일 주소" ref={emailRef}/>
            <CommonInput type="password" name="password" placeholder="비밀번호" autoComplete="on" className="last" ref={pwRef} onKeyDown={enterHandler}/>
            <BasicButton name={title} height="4.77rem" onClickFunc={currentUrl === '/login' ? onLoginSubmit : onSingUpSubmit}/>
            <div>
                {text}
                <Link to={url}> {linkText}</Link>
            </div>
        </FormContent>
    </CommonPageWrapper>
}

const FormContent = styled.article`
    position:relative;z-index:2;
    ${FlexColumn};
    width:50rem;min-height:30rem;padding:6rem 6.8rem;background-color:rgba(0,0,0,.75);border-radius:4px;box-sizing:border-box;
    h2 { margin-bottom:3rem;font-size:3vw; }
    form { 
        ${FlexColumn};
    }
    div {
        color:${({theme})=>theme.colorVariant.black800};
    }
    a {
        ${Font500}
    }
    input {
        &.last { margin-top:1rem; }    
    }
    button { margin:3rem 0 1rem; }
`

export default FormPage;   