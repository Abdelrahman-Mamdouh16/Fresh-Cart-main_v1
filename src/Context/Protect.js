import { Navigate, useNavigate } from "react-router-dom"



export default function Protect({children}){
    
    if (localStorage.getItem('UserToken')!==null){
        return children
    }
    else
    {
        return <Navigate to="/Login"/>
    }
}