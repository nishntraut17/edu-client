import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/auth/register/', userDetails)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={userDetails.username} onChange={handleChange} placeholder="Username" />
                <input type="text" name="name" value={userDetails.name} onChange={handleChange} placeholder="Name" />
                <input type="email" name="email" value={userDetails.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={userDetails.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup