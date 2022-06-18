import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import "../src/i18next"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from "@mui/material/styles"
// import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";


const themeRtl = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

const themeLtr = createTheme({
  direction: 'ltr', // Both here and <body dir="rtl">
});
const ltrTheme = document.documentElement.dir === "rtl" ? createTheme({ direction: "rtl" }) : createTheme({ direction: "ltr" });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
   
      <ThemeProvider theme={ltrTheme.direction === "ltr" ? themeRtl : themeLtr}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </ ThemeProvider >
   
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
