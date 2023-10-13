import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import CartPage from '../pages/CartPage'
import HomePage from '../pages/HomePage'
import ContactPage from '../pages/ContactPage'
import AdminPage from '../pages/AdminPage'
import Layout from '../layout/Layout'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'admin', element: <AdminPage /> },
            { path: 'login', element: <LoginPage /> },
        ]
    },

])

export default function Route() {
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}
