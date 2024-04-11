import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const token = localStorage.getItem('token')
    let user;
    if (token) {
        user = jwtDecode(token)
        console.log(user)
    }
    return (
        <nav className="flex justify-between items-center px-16 py-2 z-30 border-b sticky bg-white">
            <Link to="/">
                <div className="h-12">
                    <img src="/logo.png" alt="logo" className="h-full" />
                </div>
            </Link>
            <div className="">
                <Link to="/">
                    <button className="text-extrabold px-4 py-1 hover:text-blue-600">Home</button>
                </Link>

                <Link to="/predict">
                    <button className="text-extrabold px-4 py-1 hover:text-blue-600">College Predictor</button>
                </Link>

                {user && user.username === 'admin' && (
                    <Link to="/add">
                        <button className="text-extrabold px-4 py-1 hover:text-blue-600">Add Data</button>
                    </Link>
                )}
            </div>
            <div className="">
                {user ? (
                    <div className="flex flex-row items-center">
                        <span className="mr-4">{`Welcome ${user.name}!`}</span>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.reload();
                            }}
                            className="text-extrabold px-4 py-1 bg-red-400 hover:bg-red-600 rounded text-white text-sm"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/auth/login" className="text-extrabold">Login</Link>
                )}
            </div>
        </nav>
    );

}

export default Navbar