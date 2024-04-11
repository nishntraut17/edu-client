import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
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
        axios.post('http://127.0.0.1:8000/auth/register/', userDetails)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        navigate('/')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="mb-8">
                <img src="/logo.png" alt="logo" className="h-20" />
            </div>
            <form onSubmit={handleSubmit} className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
                <div className="mb-6">
                    <input
                        type="text"
                        name="username"
                        value={userDetails.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                >
                    Sign Up
                </button>
                <div>
                    <p className="mt-4 text-center">
                        Already have an account? <a href="/auth/login" className="text-blue-500 hover:underline">Login</a>
                    </p>
                </div>
            </form>
        </div>
    );

}

export default Signup