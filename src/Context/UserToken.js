import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


export let UserToken = createContext(null);

export default function UserTokenProvider({ children }) {

    let [isLogin, setIsLogin] = useState(null)
    let [UserId, setUserId] = useState(null)

    if (localStorage.getItem('UserToken') !== null){<Navigate to={"/Login"}></Navigate>}else{}
    useEffect(() => {
        if (localStorage.getItem('UserToken') !== null) {
            let { id } = jwtDecode(localStorage.getItem('UserToken'));
            setUserId(id)}
    }, [])
    // console.log(isLogin);
    return <UserToken.Provider value={{ isLogin, setIsLogin, UserId }}>
        {children}
    </UserToken.Provider>
}