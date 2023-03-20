import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';

const pastelTheme = {
  textColor: 'lightpink',
  backgroundColor: 'beige'
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={pastelTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);