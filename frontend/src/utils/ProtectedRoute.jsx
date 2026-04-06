import { Navigate } from 'react-router-dom';

//@param { React.ReactNode} props.children - The protected 
// content to render if authenticated
export default function ProtectedRoute({children}){

    //check if token exists in localStorage
    const token = localStorage.getItem('token');

    //authenticate: render protected children
    // notautheticated: redirect to login page
    return token ? children : <Navigate to="/login"/>
}