import React from 'react'
import { jwtDecode } from 'jwt-decode'

const Navbar = () => {
    const token = localStorage.getItem('token')
    let user;
    if (token) {
        user = jwtDecode(token)
        console.log(user)
    }
    return (
        <div>
            <h1>Navbar</h1>
            <h1>{user?.username}</h1>
        </div>
    )
}

export default Navbar