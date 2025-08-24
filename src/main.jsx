import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './mainLayout/MainLayout.jsx';
import Home from './mainLayout/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/SignUp.jsx';
import CreateProductForm from './components/CreateProductForm.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import Products from './mainLayout/pages/Products.jsx';
import ProductDetailsPage from './mainLayout/pages/ProductDetailsPage.jsx';
import Cart from './mainLayout/pages/Cart.jsx';
import PrivateRoute from './mainLayout/pages/PrivateRoute.jsx';
import OrderSummary from './mainLayout/pages/OrderSummary.jsx';
import MyOrders from './mainLayout/pages/MyOrders.jsx';
import AllOrders from './mainLayout/pages/AllOrders.jsx';
import MyProducts from './components/MyProducts.jsx';
import UpdateProduct from './components/UpdateProduct.jsx';
import MyInvoices from './components/MyInvoices.jsx';
    const router = createBrowserRouter([
  {
    path: "/",
    element:  <MainLayout></MainLayout>,
    children:[
      {
        index:true , element:<Home></Home>
      },
      {
        path:"login",
        Component:Login
      },
      {
        path:"signup",
        Component:Signup
      },
      {
        path:"create",
        element:<CreateProductForm></CreateProductForm>
      },
      {
         path:"my-products",
         element:<MyProducts></MyProducts>
      },
      {
         path:"update-product/:id",
         element:<UpdateProduct></UpdateProduct>
      },
      {
        path:"products",
        element:<Products></Products>
      },
      {
        path:"products/:id",
        element:<ProductDetailsPage></ProductDetailsPage>
      },
    {
         path:"cart",
         Component:Cart
    },
    {
      path:"order-summary",
      element:<PrivateRoute><OrderSummary></OrderSummary></PrivateRoute>
    },
    {
      path:"my-order",
      element:<MyOrders></MyOrders>
    },
    {
      path:"all-orders",
      element:<AllOrders></AllOrders>
    },
    {
      path:"invoice",
      element:<MyInvoices></MyInvoices>
    }
    
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider> 
 
  <RouterProvider router={router} />
   </AuthProvider>
  
  </StrictMode>,
)
