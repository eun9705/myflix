import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import GeneralLayout from 'layout/GeneralLayout';
import Home from 'pages/Home';
import MoviePage from 'pages/MoviePage';
import MyListPage from 'pages/MyListPage';
import TvPage from 'pages/TvPage';
import FormPage from 'pages/FormPage';
import SearchPage from 'pages/SerachPage';
import ContentPlayPage from 'pages/ContentPlayPage';

export interface GlobalNavigationBarElement {
    id:number,
    label:string,
    path:string
}

interface RouterElement extends GlobalNavigationBarElement{
    element:React.ReactNode,
    isAuth:boolean,
    showMenu:boolean
}

const routerData:RouterElement[] = [
    {
        id:0,
        label:"HOME",
        path:"/",
        element:<Home/>,
        isAuth:false,
        showMenu:false
    },
    {
        id:1,
        label:"로그인",
        path:"/login",
        element:<FormPage/>,
        isAuth:false,
        showMenu:false
    },
    {
        id:2,
        label:"회원가입",
        path:"/sign-up",
        element:<FormPage/>,
        isAuth:false,
        showMenu:false
    },
    {
        id:3,
        label:"영화",
        path:"/movie",
        element:<MoviePage />,
        isAuth:true,
        showMenu:true        
    },
    {
        id:4,
        label:"시리즈",
        path:"/tv",
        element:<TvPage />,
        isAuth:true,
        showMenu:true     
    },
    {
        id:5,
        label:"내가 찜한 콘텐츠",
        path:"/my-list",
        element:<MyListPage />,
        isAuth:true,
        showMenu:true        
    },
    {
        id:6,
        label:"검색페이지",
        path:"/search",
        element:<SearchPage />,
        isAuth:true,
        showMenu:false        
    },
    {
        id:7,
        label:"동영상 재생 페이지",
        path:"/watch",
        element:<ContentPlayPage />,
        isAuth:true,
        showMenu:false        
    }
]

export const routers = createBrowserRouter(
    routerData.map((router)=>{
        return {
            path:router.path,
            element:<GeneralLayout>{router.element}</GeneralLayout>
        }
    })
);

export const GlobalNavigationBarContent: GlobalNavigationBarElement[] = routerData.reduce((prev, router) => {
    if (!router.showMenu) return prev
  
    return [
      ...prev,
      {
        id: router.id,
        path: router.path,
        label: router.label
      }
    ]
  }, [] as GlobalNavigationBarElement[])