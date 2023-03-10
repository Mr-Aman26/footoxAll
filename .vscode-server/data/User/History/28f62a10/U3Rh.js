import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { BrowserRouter } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import reportWebVitals from './reportWebVitals';
import { store } from "./redux/store";
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
const isTabletDevice = useMediaQuery({
  query: "(min-device-width: 768px)",
});

const isLaptop = useMediaQuery({
  query: "(min-device-width: 1024px)",
});

const isDesktop = useMediaQuery({
  query: "(min-device-width: 1200px)",
});

const isBigScreen = useMediaQuery({
  query: "(min-device-width: 1201px )",
});

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
