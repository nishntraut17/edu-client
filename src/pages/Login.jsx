import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:8000/auth/login/', userDetails)
        console.log(response)
        localStorage.setItem('token', response.data.access)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={userDetails.username} onChange={handleChange} placeholder="Username" />
                <input type="password" name="password" value={userDetails.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Login