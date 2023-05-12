import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/login/Login.tsx'
import './assets/styles/normalize.css'
import './assets/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
