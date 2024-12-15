import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const token = localStorage.getItem("access_token")


    const getProfile = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        try {
            const res = await axios.get("https://dummyjson.com/auth/me", config);
            setProfile(res.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto py-8">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Profile Page</h1>
                    {profile ? (
                        <div className="text-center">
                            <img
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                                src={profile.image || "https://via.placeholder.com/150"}
                                alt="Profile Avatar"
                            />
                            <h2 className="text-2xl font-semibold text-gray-700">Welcome, {profile.username}</h2>
                            <p className="text-gray-600 mb-4">Email: {profile.email}</p>
                            <div className="text-left">
                                <h3 className="text-xl font-semibold text-gray-700 mt-6">Profile Details</h3>
                                <p className="text-gray-600 mt-2"><strong>Full Name:</strong> {profile.firstName} {profile.maidenName} {profile.lastName}  </p>
                                <p className="text-gray-600 mt-2"><strong>Age:</strong> {profile.age} Years Old</p>
                                <p className="text-gray-600 mt-2"><strong>Gender:</strong> {profile.gender}</p>
                                <p className="text-gray-600 mt-2"><strong>Email:</strong> {profile.email}</p>
                                <p className="text-gray-600 mt-2"><strong>Phone:</strong> {profile.phone}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage