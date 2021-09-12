import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import rtl from 'jss-rtl';
import { create } from 'jss';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import theme from 'src/theme';
import routes from 'src/routes';
import { StoreContextProvider } from './store/store-context';
import { useAuth } from './store/auth-context';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App = () => {
  const { currentUser = null } = useAuth() || {};
  const routing = useRoutes(routes(currentUser));

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StoreContextProvider>
          {routing}
        </StoreContextProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
