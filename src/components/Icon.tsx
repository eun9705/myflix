import styled from "styled-components"
import { IconSet,iconName } from "../ts/path"
import { DeviceQuery } from "style/responsive"

type IconProps = {
    icon:iconName,
}

const Icon = ({icon}:IconProps) => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width={IconSet[icon].width ? IconSet[icon].width : "1em"} height={IconSet[icon].height ? IconSet[icon].height : "1em"} viewBox={IconSet[icon].viewBox} >
        {IconSet[icon].path.map((item,index)=>{
            return <path d={item} fill={IconSet[icon].fill} stroke={IconSet[icon].stroke} strokeWidth={IconSet[icon].strokeWidth} strokeLinecap={IconSet[icon].strokeLinecap} key={index}/>
        })}
    </Svg>
}

const Svg = styled.svg`
    /* ${DeviceQuery.small`
        width:1em;height:1em;
    `} */
`

export default Icon;