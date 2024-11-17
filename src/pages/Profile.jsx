import React, { useState } from 'react';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user } = useFirebaseAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || ''
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(user, {
                displayName: formData.displayName,
                photoURL: formData.photoURL
            });
            toast.success('Profile updated successfully');
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Failed to update profile');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen pt-20 px-4 my-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center">
                    <img
                        src={user?.photoURL || '/default-avatar.png'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                    <h1 className="text-2xl font-bold mb-2">{user?.displayName}</h1>
                    <p className="text-gray-600 mb-4">{user?.email}</p>
                    
                    {/* Only show update button for email/password users */}
                    {!user?.providerData[0]?.providerId.includes('google') && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Update Profile
                        </button>
                    )}
                </div>

                {/* Update Profile Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Display Name</label>
                                    <input
                                        type="text"
                                        value={formData.displayName}
                                        onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Photo URL</label>
                                    <input
                                        type="url"
                                        value={formData.photoURL}
                                        onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile; 