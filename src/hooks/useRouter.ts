import { useNavigate } from 'react-router-dom';

export const useRouter = () => {
    const router = useNavigate();

    return {
        currentUrl:window.location.pathname,
        routeTo: (path:string,optionVal?:string) => router(path,{
            state: {
                params:optionVal
            }
        }),
        goBack: ()=> router(-1),
    }
}