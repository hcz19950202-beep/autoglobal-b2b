import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { CompareProvider } from './contexts/CompareContext'
import { SiteConfigProvider } from './contexts/SiteConfigContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SiteConfigProvider>
        <LanguageProvider>
          <CompareProvider>
            <App />
          </CompareProvider>
        </LanguageProvider>
      </SiteConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
