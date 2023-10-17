import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CartPage from '../pages/CartPage'
import HomePage from '../pages/HomePage'
import ContactPage from '../pages/ContactPage'
import AdminPage from '../pages/AdminPage'
import Layout from '../layout/Layout'
import Product from '../features/product/Product'
import { useAuth } from '../hooks/use-auth'



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'product', element: <Product /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'admin', element: <AdminPage /> },
        ]
    },

])

export default function Route() {
    const {authUser} = useAuth();
    console.log(authUser)

    return (
        <RouterProvider router={router}></RouterProvider>
    )
}
