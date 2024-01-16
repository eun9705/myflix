# Myflix
TMDB Open API, Firebase를 활용하여 제작한 서비스입니다.

<br /><br />
## ✔ 프로젝트 소개
TMDB Open API를 이용하여 Netflix와 비슷하게 구현해본 웹 서비스 입니다.<br />
Button, form 요소를 최대한 재사용할 수 있는 방향으로 컴포넌트를 구성해보았으며,<br />
React,Recoil,Vite, Styled-components,Typescript, useRouter, useScroll, useDebounce custom hook을 사용하여 구현하였습니다.


<p align="center">
  <img src="https://github.com/eun9705/myflix/assets/38933350/5643a871-8777-40ed-abb3-8afdc83e0787">
</p>

배포주소: [https://my-flixxx.netlify.app/](https://my-flixxx.netlify.app/)
<br /><br />

## 🧾 설치 가이드
```
$ git clone https://github.com/eun9705/myflix.git
$ npm install
$ npm run dev
```
### 테스트 계정
```
test@gmail.com
test12345!
```

<br /><br />
## 🛠 기술 스택
### Environment
<div>
  <img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white">  
</div>

### Development
<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">  
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">  
</div>

### Deploy
<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
<br /><br />

## 💻 화면구성
* 로그인-회원가입, 영화-시리즈, 검색결과-내가찜한콘텐츠 페이지의 경우 내용은 상이하지만 UI는 동일합니다.

|메인페이지|로그인/회원가입페이지|
|------|---|
|<p align="center"><img src="https://github.com/eun9705/myflix/assets/38933350/dc367cdb-565a-40df-9345-1dbb807a7055"></p>|<p align="center"><img src="https://github.com/eun9705/myflix/assets/38933350/25c68a2e-465c-4f57-b681-3c483205258a"></p>|

|영화/시리즈페이지|검색결과/내가찜한콘텐츠페이지|
|------|---|
|<p align="center"><img src="https://github.com/eun9705/myflix/assets/38933350/26149a53-d459-4706-a33e-23e1f63fb094"></p>|<p align="center"><img src="https://github.com/eun9705/myflix/assets/38933350/844859e3-37c4-4332-80a9-a3b3382500c7"></p>|

<br /><br />
## 🕹 주요 기능
### ⭐️ 영화, 시리즈 정보 확인 가능
영화, 시리즈 포스터 클릭 시 상세 정보 확인 가능
추후 지속적으로 UI 수정 예정
### ⭐️ 제목, 장르로 검색 가능
제목, 장르를 통해 영화, 시리즈 정보 검색 가능
### ⭐️ 콘텐츠 찜하기 가능
상세보기에 plus/check 버튼을 이용하여 콘텐츠 찜하기/삭제 가능

<br /><br />
## 📦 디렉토리 구조
```
src
 ┣ api
 ┃ ┣ axios.ts
 ┃ ┗ requests.ts
 ┣ assets
 ┃ ┣ home_bg.jpg
 ┃ ┗ logo.svg
 ┣ atom
 ┃ ┗ login.ts
 ┣ components
 ┃ ┣ BasicButton.tsx
 ┃ ┣ ContentResultList.tsx
 ┃ ┣ ContentRow.tsx
 ┃ ┣ DetailModal.tsx
 ┃ ┣ Footer.tsx
 ┃ ┣ GlobalNavigationBar.tsx
 ┃ ┣ Header.tsx
 ┃ ┣ Icon.tsx
 ┃ ┣ IconButton.tsx
 ┃ ┣ RepresentativeImage.tsx
 ┃ ┗ ScrollToTop.tsx
 ┣ firebase
 ┃ ┗ firebase.ts
 ┣ hooks
 ┃ ┣ useDebounce.ts
 ┃ ┣ useRouter.ts
 ┃ ┗ useScroll.ts
 ┣ layout
 ┃ ┗ GeneralLayout.tsx
 ┣ pages
 ┃ ┣ ContentPlayPage.tsx
 ┃ ┣ FormPage.tsx
 ┃ ┣ Home.tsx
 ┃ ┣ MoviePage.tsx
 ┃ ┣ MyListPage.tsx
 ┃ ┣ PageNotFoundPage.tsx
 ┃ ┣ SerachPage.tsx
 ┃ ┗ TvPage.tsx
 ┣ style
 ┃ ┣ globalStyle.ts
 ┃ ┣ responsive.ts
 ┃ ┗ theme.ts
 ┣ ts
 ┃ ┗ path.ts
 ┣ types
 ┃ ┗ movie.ts
 ┣ App.tsx
 ┣ main.tsx
 ┣ router.tsx
 ┗ vite-env.d.ts
```

