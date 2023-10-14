import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './contexts/AuthContext.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ProductContextProvider from './contexts/ProductContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AuthContextProvider>
      <ProductContextProvider>

        <App />
      </ProductContextProvider>
    </AuthContextProvider>
  </LocalizationProvider>

)
