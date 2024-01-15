import styled from "styled-components";
import { FlexRowCenterCenter, Font500 } from "style/globalStyle";
import { iconName } from "ts/path";
import Icon from "./Icon";

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
    line-height: 1;
    gap: 1rem;
    height: ${(props)=>props.height ? props.height : "4rem"};
    padding: 0 1.4rem;
    background-color: ${(props)=>props.bgcolor ? props.bgcolor : "#E50914"};
    ${Font500}
    font-size: 1.6rem;border-radius:5px;
    color: ${(props)=>props.color ? props.color : "#FFFFFF"};
    &.small {
        min-width:80px;min-height:32px;padding:0 2%;font-size: 1.6rem;
    }
`

export default BasicButton;