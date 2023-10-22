import { Outlet } from "react-router-dom"
import AdminHeader from "./AdminHeader"


export default function AdminLayout() {
    return (
        <div>
            <AdminHeader />
            <Outlet />
        </div>
    )
}
