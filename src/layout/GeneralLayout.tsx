import { useCallback, useEffect } from "react"
import { useRecoilValue } from "recoil"
import { isLoggedInState } from "atom/login"
import { useRouter } from "hooks/useRouter"
import ScrollToTop from "components/ScrollToTop"
import Footer from "components/Footer"
import Header from "components/Header"

interface GeneralLayoutProps {
    children:React.ReactNode
}

const GeneralLayout = ({children}:GeneralLayoutProps) => {
    const { currentUrl,routeTo }  = useRouter();
    const isLogIn = useRecoilValue(isLoggedInState);

    const checkLoggedIn = useCallback(()=>{
        if(!isLogIn && currentUrl !== '/') {
            routeTo('/login');
            return;
        }
    },[]);
    
    useEffect(()=>{
        checkLoggedIn();
    },[]);

    return <>
        <ScrollToTop />
        <Header />
            {children}
        <Footer />
    </>
}

export default GeneralLayout;