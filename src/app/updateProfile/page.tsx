"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


interface User {
    name: string;
    email: string;
    username: string;
    address: string;
    filename: string;
}

export default function UpdateProfile() {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        username: '',
        address: '',
        filename: ''
    });
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/signin');
                    return;
                }

                const response = await axios.get('http://localhost:3444/user/viewprofile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/signin');
            }
        };

        fetchUserData();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/signin');
                return;
            }

            // Send only the required fields for update
            const updateData = {
                name: user.name,
                email: user.email,
                address: user.address
            };

            const response = await axios.put(
                `http://localhost:3444/user/update_profile/${user.username}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setSuccess('Profile updated successfully!');
            setTimeout(() => {
                router.push('/viewprofile');
            }, 2000);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
        }
    };

    return (
        <>
        <Navbar />
            
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center mb-4">Update Profile</h2>
                        
                        {error && <div className="alert alert-error mb-4">{error}</div>}
                        {success && <div className="alert alert-success mb-4">{success}</div>}
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={user.address}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}