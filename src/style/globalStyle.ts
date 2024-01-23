import styled, { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import mainBg from "assets/home_bg.jpg";
import { DeviceQuery } from "./responsive";

export const GlobalStyle = createGlobalStyle`
    //reset
    ${reset}
    button { border:none;cursor: pointer;font-family: 'Noto Sans KR',sans-serif;font-weight:400; }
    a { text-decoration:none;cursor: pointer; }
    html { font-size:62.5%; }
    body {
        background-color:${({theme})=>theme.colorVariant.black900};
        font-family: 'Noto Sans KR',sans-serif;font-weight:400;
        font-size: 1.6rem;
        font-weight:400;
        line-height: normal; //line-height:1 대신 normal 사용   
        &.off-scroll { overflow-y:hidden; }
    }
    * { 
        color:${({theme})=>theme.colorVariant.white};     
    }
    .desktop-none { display:none; }
    ${DeviceQuery.medium`
        html { 
            font-size:50%; 
            text-size-adjust:none;
            -webkit-text-size-adjust:none; 
            -moz-text-size-adjust:none;
            -ms-text-size-adjust:none;
        }
        body { font-size:1.4vw; }
    `}
    ${DeviceQuery.small`
        .tablet-none { display:none; }
        .desktop-none { display:block; }
        body { font-size:2vw; }
    `}
    ${DeviceQuery.xsmall`
        html { font-size:25%; }
        .mobile-none { display:none; }
        body { font-size:12px; }
    `}
`

export const Font500 = css`
    font-weight: 500;
`

export const Font700 = css`
    font-weight: 700;
`


export const FlexRow = css`
    display: flex;
`

export const FlexColumn = css`
    display: flex;flex-direction:column;
`

export const FlexColumnCenter = css`
    ${FlexColumn};
    justify-content:center;
`

export const FlexColumnCenterCenter = css`
    ${FlexColumn};
    align-items: center;
    justify-content: center;
`

export const FlexRowCenter = css`
    ${FlexRow}
    align-items: center;
`

export const FlexRowCenterCenter = css`
    ${FlexRowCenter}
    justify-content: center;
`

export const FlexRowSpaceBetween = css`
    ${FlexRowCenter};
    justify-content: space-between;
`

export const CommonPageWrapper = styled.section`
    position:relative;
    ${FlexColumnCenterCenter}
    height:100vh;background:url(${mainBg}) no-repeat center / cover;
    &::after { position:absolute;left:0;top:0;content:'';width:100%;height:100%;background:linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%) rgb(0 0 0 / 40%); }
`
export const CommonInput = styled.input<{width?:string,height?:string}>`
    width: ${(props)=>props.width || '100%'};
    height: ${(props)=>props.height || '4.75rem'};
    padding:1.5rem 1rem;background:rgba(0,0,0,.7);border: 1px solid ${({theme})=>theme.colorVariant.mainColor};border-radius:5px;box-sizing:border-box;
    font-size: 2rem;
    &::placeholder { font-size:2rem; }
    ${DeviceQuery.medium`
        height:7rem;
    `}
    ${DeviceQuery.xsmall`
        height:13rem;
        font-size:4rem;
        &::placeholder { font-size:4rem; }
    `}
`

export const ResultWrapper = styled.section`
    padding: 12rem 4% 0;
    h3 { font-size:2.4rem; }
    ${DeviceQuery.xsmall`
        padding: 20rem 4%;
        h3 { font-size:4rem; }
    `}
`

export const CloseButton = styled.button<{rotate?:string,left?:string,right?:string,top?:string}>`
    position: absolute;
    z-index:2;
    ${(props)=>props.left && css`
        left:${props.left || 0};
    `}
    ${(props)=>props.right && css`
        right:${props.right || 0};
    `}
    ${(props)=>props.top && css`
        top:${props.top || 0};
    `}
    ${FlexColumnCenterCenter}
    width: 5rem;height:5rem;
    background-color:#333;
    border-radius:50%;
    transform:rotate(${(props)=>props.rotate || 0});
    ${DeviceQuery.small`
        min-width:50px;min-height:50px;
    `}
`