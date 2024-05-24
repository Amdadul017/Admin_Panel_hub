import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './AuthProvider';
import axios from 'axios'

const NaveBar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    //console.log(user)
    const getUser = async()=>{
        try {
            const userInfo = await axios.get("https://admin-panel-hub.onrender.com/api/user/getUser",{
                headers: {
                    'x-access-token': token
                }
            })
            //console.log(userInfo)
            if(userInfo.data.status==="ok"){
                setUser(userInfo.data.userData)
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
       
    }
    useEffect(()=>{
        getUser()
    },[])
    const handleLogout = () => {
        localStorage.setItem('token', '')
        setUser(null)
        //navigate('/login')
        window.location.reload()
    }
    return (
        <div>
            <nav class="navbar navbar-dark justify-content-between" style={{ backgroundColor: "#6082B6" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <h1>Home</h1>
                    </Link>

                    {user ? <div style={{ display: "flex", gap: "10px" }}>
                        <Link ><h4 style={{color: "white"}}>{user?.name}</h4></Link>
                        <Link className="btn btn-outline-light">
                            <button style={{color: "white"}} onClick={handleLogout}>Logout</button>
                        </Link>
                    </div> : <div>
                        <Link className="btn btn-outline-light" to="/login">
                            Sign in
                        </Link>
                        <Link className="btn btn-outline-light" to="/register">
                            Sign up
                        </Link>
                    </div>}
                    {/* <Link className="btn btn-outline-light" to="/addtodo">
          Add ToDo
        </Link> */}
                </div>
            </nav>
        </div>
    )
}

export default NaveBar