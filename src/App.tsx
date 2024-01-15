import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { routers } from 'router';
import { GlobalStyle } from 'style/globalStyle';
import theme from 'style/theme';
import { ThemeProvider } from 'styled-components';
const App = () => {
    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <RouterProvider router={routers}/>
            </ThemeProvider>
        </RecoilRoot>
  )
}

export default App
