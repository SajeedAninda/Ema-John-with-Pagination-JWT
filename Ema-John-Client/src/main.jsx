import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './Components/Products/Products.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App>Hello world!</App>,
    children: [
      {
        path: "/",
        element: <Products></Products>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
