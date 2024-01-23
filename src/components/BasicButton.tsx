import styled from "styled-components";
import { FlexRowCenterCenter, Font500 } from "style/globalStyle";
import { iconName } from "ts/path";
import Icon from "./Icon";
import { DeviceQuery } from "style/responsive";

type ButtonProps = {
    name:string,
    height?:string,
    size?:string
    bgcolor?:string,
    color?:string,
    icon?:iconName
    onClickFunc?: () => void,
}

const BasicButton = ({name,height,onClickFunc,size,icon,bgcolor,color}:ButtonProps) => {
    return <ButtonWrapper height={height} onClick={onClickFunc} className={size !== null ? size : ""} bgcolor={bgcolor} color={color}>
        {icon && <Icon icon={icon}/>}
        {name}
    </ButtonWrapper>
}

const ButtonWrapper = styled.button<{height?:string,bgcolor?:string,color?:string}>`
    ${FlexRowCenterCenter}
    line-height: 1;gap: 1rem;min-height:32px;
    height: ${(props)=>props.height ? props.height : "4rem"};
    padding: 0 2%;
    background-color: ${(props)=>props.bgcolor ? props.bgcolor : "#E50914"};
    ${Font500}
    font-size: 1.6rem;border-radius:5px;
    color: ${(props)=>props.color ? props.color : "#FFFFFF"};
    &.small {
        min-width:80px;
    }
    ${DeviceQuery.medium`
        font-size:2rem;
        min-height:50px;
        &.small {
            min-height:40px;
        }
    `}
    ${DeviceQuery.small`
        min-height:40px;font-size:12px;
        svg { width:14px;height:14px; }
    `}
    ${DeviceQuery.xsmall`
        padding:0 4%;height:10rem;
        &.small {
            padding: 0 2%;
        }
    `}
`

export default BasicButton;