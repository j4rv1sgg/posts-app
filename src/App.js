import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import './styles/App.css'
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/utils/AppRouter";
import {AuthContext} from "./context";
import Login from "./pages/Login";

const App = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{
        if(localStorage.getItem('auth')){
            setIsAuth(true)
        }
        setLoading(false)
    }, [])


    return (

        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>

        </AuthContext.Provider>


    );
};

export default App;