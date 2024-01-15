import { useEffect, useState } from "react"

export const useScroll = () => {
    
    const [scrollY,setScrollY] = useState<number>(0);
    const scrollHandler = () => {
        setScrollY(window.pageYOffset);
    }

    useEffect(()=>{
        window.addEventListener("scroll",scrollHandler);
        return () => window.removeEventListener("scroll",scrollHandler);
    });
    return {scrollY};
}