import React, { useState } from 'react';
import Navbar from '../../components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const handleChange = (e) => {
        setError("");
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://dummyjson.com/user/login', form);
            localStorage.setItem("access_token", response.data.accessToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);
            setSuccess("Login berhasil..")

            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-grow items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                name="username"
                                type="username"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name='password'
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                {loading ? "Loading.." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;