import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import CartPage from '../pages/CartPage'
import HomePage from '../pages/HomePage'
import ContactPage from '../pages/ContactPage'
import AdminPage from '../pages/AdminPage'
import Layout from '../layout/Layout'
import Product from '../features/product/Product'
import { useAuth } from '../hooks/use-auth'
import Payment from '../pages/Payment'
import Profile from '../pages/Profile'
import Loading from '../components/Loading'



export default function Route() {
    const { authUser} = useAuth();

    // if (initialLoading) {
    //     return <Loading />
    // }

    let router =[]

    if (!authUser) {
        console.log('no AuthUser')
        router = createBrowserRouter([
            {
                path: '/',
                element: <Layout />,
                children: [
                    { path: '', element: <HomePage /> },
                    { path: 'product', element: <Product /> },
                    { path: 'contact', element: <ContactPage /> },
                ]
            },

        ])
    }

    console.log(authUser)



    if (authUser?.role === 'USER') {
        console.log('auth user')
        router = createBrowserRouter([
            {
                path: '/',
                element: <Layout />,
                children: [
                    { path: '', element: <HomePage /> },
                    { path: 'product', element: <Product /> },
                    { path: 'contact', element: <ContactPage /> },
                    { path: 'cart', element: <CartPage /> },
                    { path: 'cart/update/:id', element: <Product /> },
                    { path: 'payment', element: <Payment /> },
                    { path: 'profile', element: <Profile /> },
                ]
            },

        ])
    }


    if (authUser?.role === 'ADMIN') {
        router = createBrowserRouter([
            {
                path: '/',
                element: <Layout />,
                children: [
                    { path: '', element: <AdminPage /> },

                ]
            },

        ])
    }


    return (
        <RouterProvider router={router}></RouterProvider>
    )
}
