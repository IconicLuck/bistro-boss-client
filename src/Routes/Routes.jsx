import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'ourMenu',
                element: <Menu></Menu>
            },
            {
                path: 'ourShop/:category',
                element: <Order></Order>
            },
            {
                path: 'login',
                element: <Login></Login>
            }
        ]
    }
])