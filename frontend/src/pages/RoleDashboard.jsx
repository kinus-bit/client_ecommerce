import { getUserRole } from "@/utils/auth";
import Dashboard from "./Dashboard";
import AdminDashboard from "./admin/AdminDashboard";
import { Navigate } from "react-router-dom";
import AdminRoutes from "@/routes/AdminRoutes";

export default function RoleDashboard(){
    const userRole = getUserRole();
    
    //if no role is found,redirect to login
    if(!userRole){
        return <Navigate to="/login" replace/>
    }

    //render appropriate dashboard based on role
    switch(userRole){
        case 'admin':
            return <AdminRoutes/>
        case 'user':
            return <Dashboard/>
        default:
            //if role is not recognized,redirect to login
            return <Navigate to="/login" replace/>;

    }

}