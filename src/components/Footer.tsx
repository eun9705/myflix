import { Link } from "react-router-dom";
import { DeviceQuery } from "style/responsive";
import styled from "styled-components";

const Footer = () => {
    const url = {
        "넷플릭스 소개": "https://help.netflix.com/ko/node/412",
        "고객 센터": "https://help.netflix.com/ko/",
        "이용 약관": "https://help.netflix.com/legal/privacy",
        "개인 정보": "https://help.netflix.com/legal/privacy",
        "회사 정보": "https://help.netflix.com/legal/corpinfo",
        "문의하기": "https://help.netflix.com/ko/contactus",
        "법적 고지": "https://help.netflix.com/legal/notices",
        "투자 정보": "https://ir.netflix.net/ir-overview/profile/default.aspx"
    }
    return <FooterWapper>
            <ul>
                {Object.entries(url).map(([name,value])=>{
                    return <li key={name}><Link to={value} target="_blank">{name}</Link></li>
                })}
            </ul>
            <span>
                Contact.silverccong05@gmail.com<br /><br />
                ⓒ 2024. Bae Eunkyoung. All rights reserved.<br />
                해당 사이트는 1920*1080해상도에 최적화 되었습니다.
            </span>
    </FooterWapper>
}

const FooterWapper = styled.footer`
    max-height: 98rem;padding: 4%;box-sizing:border-box;
    ul { display: grid;grid-template-columns: repeat(4,1fr);grid-row-gap:2rem;margin-bottom:80px; }
    * { color:${({theme})=>theme.colorVariant.black800}; }
    ${DeviceQuery.xsmall`
        ul { grid-template-columns: repeat(2,1fr); }
    `}
`

export default Footer;