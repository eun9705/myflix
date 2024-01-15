import { useEffect } from "react";
import { useRouter } from "hooks/useRouter";

const ScrollToTop = () => {
    const { currentUrl } = useRouter();
    useEffect(()=>{
        window.scrollTo(0,0);
    },[currentUrl]);
    return null;
}

export default ScrollToTop;