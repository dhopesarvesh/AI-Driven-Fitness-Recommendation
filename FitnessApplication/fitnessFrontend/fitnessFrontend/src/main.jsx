import React from 'react'
import ReactDOM from 'react-dom/client'



import App from './App'
import { BrowserRouter } from 'react-router'

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>


);