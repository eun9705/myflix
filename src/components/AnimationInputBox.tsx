import { useState } from "react";
import styled from "styled-components";

type AnimationInputBoxProps = {
    label:string;
    state:string;
    setState:React.Dispatch<React.SetStateAction<string>>;
    width?:string;
    height?:string
}

const AnimationInputBox = ({label,state,setState,width,height}:AnimationInputBoxProps) => {
    const [aniOn,setAniOn] = useState<boolean>(false);
    const animationOn = () => {
        setAniOn(true);
    }
    const checkInputVal = () => {
        if(state === '') setAniOn(false);
    }
    
    return <InputBoxWrapper width={width} height={height} className="">
        <label className={aniOn ? 'on' : ''}>{label}</label>
        <input type={label === '비밀번호' ? 'password' : 'text'} onFocus={animationOn} onBlur={checkInputVal} onChange={(event)=>setState(event.target.value)}/>
    </InputBoxWrapper>
}

const InputBoxWrapper = styled.div<{width?:string,height?:string}>`
    position: relative;
    width: ${(props)=>props.width || '100%'};
    height: ${(props)=>props.height || '5.6rem'};
    min-height: 50px;
    padding:1.5rem 2rem 0;background:rgba(0,0,0,.7);border: 1px solid ${({theme})=>theme.colorVariant.mainColor};border-radius:5px;box-sizing:border-box;
    label { 
        position:absolute;transition:.3s;
        color:${({theme})=>theme.colorVariant.black800};
        &.on {
            font-size: 1.3rem;transform:translateY(-10px);
        }
    }
    input {
        width: 100%;height:100%;background-color:transparent;border:none;outline:none;font-size: 2rem;
        &:focus {}
`

export default AnimationInputBox;