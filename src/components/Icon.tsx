import { IconSet,iconName } from "../ts/path"

type IconProps = {
    icon:iconName,
}

const Icon = ({icon}:IconProps) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={IconSet[icon].width ? IconSet[icon].width : "24"} height={IconSet[icon].height ? IconSet[icon].height : "24"} viewBox={IconSet[icon].viewBox} >
        {IconSet[icon].path.map((item)=>{
            return <path d={item} fill={IconSet[icon].fill} stroke={IconSet[icon].stroke} stroke-width={IconSet[icon].strokeWidth} stroke-linecap={IconSet[icon].strokeLinecap}/>
        })}
    </svg>
}

export default Icon;