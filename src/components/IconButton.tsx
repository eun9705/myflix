import styled from "styled-components";
import { iconName } from "ts/path";
import Icon from "./Icon";
import { FlexColumnCenterCenter, Font500 } from "style/globalStyle";
import { DeviceQuery } from "style/responsive";

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
    width: 4rem;height:4rem;
    background-color: rgba(0,0,0,.5);
    border: 1px solid white;border-radius:50%;
    .on {
        background-color: white;
    }
    span { 
        position: absolute;left:0;top:-5rem;
        ${FlexColumnCenterCenter}
        width:17rem;height:4rem;
        ${Font500}
        background-color: #CDCDCD;color:#333;border-radius:20px;opacity:0;transition:.3s ease-in-out;
    }
    &:hover {
        span { opacity:1; }
    }
    ${DeviceQuery.medium`
        min-height:50px;min-width:50px;
        span { top:auto;bottom:auto;left:58px;min-width:160px;min-height:30px;opacity:1; }
    `}
    ${DeviceQuery.small`
        min-height:40px;min-width:40px;
        span { left:48px; }
    `}
`

export default IconButton;