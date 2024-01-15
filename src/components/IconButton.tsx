import styled from "styled-components";
import { iconName } from "ts/path";
import Icon from "./Icon";
import { FlexColumnCenterCenter, Font500 } from "style/globalStyle";

type IconButtonProps = {
    title:string;
    icon:iconName;
    onClickFunc: () => void;
}

const IconButton = ({title,icon,onClickFunc}:IconButtonProps) => {
    return <IconButtonWrapper onClick={onClickFunc}>
        <span>{title}</span>
        <Icon icon={icon}/>
    </IconButtonWrapper>
}

const IconButtonWrapper = styled.button`
    position: relative;
    ${FlexColumnCenterCenter}
    width: 3rem;height:3rem;
    background-color: rgba(0,0,0,.5);
    border: 1px solid white;border-radius:50%;
    /* path { 
        fill:white; 
        stroke-width: 1px;
    } */
    .on {
        background-color: white;
    }
    span { 
        position: absolute;left:0;top:-4rem;
        ${FlexColumnCenterCenter}
        width: 15rem;height:3rem;
        ${Font500}
        background-color: #CDCDCD;color:#333;border-radius:20px;opacity:0;transition:.3s ease-in-out;
    }
    &:hover {
        span { opacity:1; }
    }
`

export default IconButton;