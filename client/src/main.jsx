import React from 'react'
import { BrowserRouter } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import "./styles/styles.css"
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.js";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading ={<div>Chargement...</div>} persistor={persistor}>
        <BrowserRouter>
          <App />
      </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
