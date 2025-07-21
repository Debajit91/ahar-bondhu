import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-merriweather max-w-7xl mx-auto'>
      <RouterProvider router={router}/>
      <ToastContainer position='top-right'/>
    </div>
  </StrictMode>,
)
