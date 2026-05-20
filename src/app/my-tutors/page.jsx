"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function MyTutorsPage() {
    const [user, setUser] = useState({ email: "student@mail.com", displayName: "Antar Das" });
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const serverUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    // একটি ডিফল্ট অ্যাভাটার ইমেজ ভেরিয়েবল
    const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";

    const fetchAllTutors = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${serverUrl}/tutors`); 
            setTutors(res.data);
        } catch (err) {
            console.error("Error getting all tutors:", err);
            toast.error("Failed to load all tutors from server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem("userEmail");
        const savedName = localStorage.getItem("userName");

        if (savedEmail) {
            const activeUser = { email: savedEmail, displayName: savedName || "User" };
            setUser(activeUser);
        }
        
        fetchAllTutors(); 
    }, []); 

    const handleDelete = async (id) => {
        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#1e6b65",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirmResult.isConfirmed) {
            try {
                const deleteRes = await axios.delete(`${serverUrl}/tutors/${id}`);
                if (deleteRes.data.success) {
                    setTutors(prev => prev.filter(tutor => tutor._id !== id));
                    Swal.fire("Deleted!", "The tutor entry has been deleted.", "success");
                }
            } catch (err) {
                toast.error("Failed to delete tutor.");
            }
        }
    };

    const openUpdateModal = (tutor) => {
        setEditData({ 
            ...tutor,
            name: tutor.name || tutor.tutorName || "",
            photo: tutor.photo || tutor.photoUrl || "",
            fee: tutor.fee || tutor.hourlyFee || 0,
            slots: tutor.slots !== undefined ? tutor.slots : (tutor.totalSlots || 0)
        });
        setIsModalOpen(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${serverUrl}/tutors/${editData._id}`, editData);
            if (res.data.success) {
                setTutors(prev => prev.map(tutor => tutor._id === editData._id ? editData : tutor));
                setIsModalOpen(false);
                toast.success("Tutor profile updated successfully! 🎉");
            }
        } catch (err) {
            toast.error("Update failed. Try again.");
        }
    };

    if (loading) {
        return <div className="text-center font-medium text-slate-500 mt-20">🔄 Loading all tutors...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1e6b65]">All Tutors List</h1>
                    <p className="text-xs text-slate-500 mt-1">Viewing all available tutor profiles stored on the server.</p>
                </div>
                <div className="bg-[#eefcf7] border border-[#e0f7f0] px-4 py-2 rounded-xl text-right shrink-0">
                    <p className="text-xs font-bold text-[#1e6b65]">{user?.displayName}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{user?.email}</p>
                </div>
            </div>

            {tutors.length === 0 ? (
                <div className="bg-[#fcfbf7] border border-[#f5f2e9] rounded-2xl p-12 text-center space-y-3">
                    <p className="text-slate-600 font-semibold text-lg">No tutors found on the server! 😊</p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">It looks like the tutor list is empty right now.</p>
                </div>
            ) : (
                <div className="overflow-x-auto border border-slate-100 rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-[#eefcf7] text-[#1e6b65] font-semibold border-b border-[#e0f7f0]">
                                <th className="p-4">Tutor Post</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Mode / Location</th>
                                <th className="p-4">Hourly Fee</th>
                                <th className="p-4">Available Slots</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {tutors.map((tutor) => {
                                const tutorName = tutor.name || tutor.tutorName || "Unknown Tutor";
                                const tutorPhoto = tutor.photo || tutor.photoUrl || defaultAvatar;
                                const tutorFee = tutor.fee || tutor.hourlyFee || 0;
                                const tutorSlots = tutor.slots !== undefined ? tutor.slots : (tutor.totalSlots || 0);

                                return (
                                    <tr key={tutor._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 flex items-center gap-3">
                                            <img 
                                                src={tutorPhoto} 
                                                alt={tutorName} 
                                                className="w-10 h-10 rounded-full object-cover border border-slate-200" 
                                                onError={(e) => {
                                                    e.target.onerror = null; // 🚀 ইনফিনিট লুপ প্রটেকশন
                                                    e.target.src = defaultAvatar;
                                                }}
                                            />
                                            <div>
                                                <p className="font-medium text-slate-800">{tutorName}</p>
                                                <p className="text-[10px] text-slate-400">{tutor.institution || "N/A"}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-slate-700">{tutor.subject}</td>
                                        <td className="p-4 text-xs text-slate-600">
                                            <span className="capitalize font-semibold block text-slate-800">{tutor.mode || "N/A"}</span>
                                            <span className="text-slate-400">{tutor.location || "N/A"}</span>
                                        </td>
                                        <td className="p-4 font-mono font-semibold text-slate-700">৳{tutorFee}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${tutorSlots > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                                                {tutorSlots} Slots
                                            </span>
                                        </td>
                                        <td className="p-4 text-center space-x-2">
                                            <button onClick={() => openUpdateModal(tutor)} className="bg-sky-50 text-sky-600 hover:bg-sky-100 border border-sky-200 px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-sm">
                                                Update
                                            </button>
                                            <button onClick={() => handleDelete(tutor._id)} className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-sm">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 📋 UPDATE MODAL FORM */}
            {isModalOpen && editData && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h2 className="text-lg font-bold text-[#1e6b65]">Update Tutor Information</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Tutor Name</label>
                                <input type="text" required value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full border p-2 rounded-xl focus:outline-[#1e6b65]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Photo URL</label>
                                <input type="text" required value={editData.photo} onChange={e => setEditData({...editData, photo: e.target.value})} className="w-full border p-2 rounded-xl focus:outline-[#1e6b65]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Subject</label>
                                <input type="text" required value={editData.subject} onChange={e => setEditData({...editData, subject: e.target.value})} className="w-full border p-2 rounded-xl focus:outline-[#1e6b65]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Teaching Mode</label>
                                <select value={editData.mode} onChange={e => setEditData({...editData, mode: e.target.value})} className="w-full border p-2 rounded-xl focus:outline-[#1e6b65]">
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Hourly Fee (৳)</label>
                                <input type="number" required value={editData.fee} onChange={e => setEditData({...editData, fee: e.target.value})} className="w-full border p-2 rounded-xl focus:outline-[#1e6b65]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Available Slots</label>
                                <input type="number" required value={editData.slots} onChange={e => setEditData({...editData, slots: e.target.value})} className="w-full border p-2 rounded-xl focus:outline-[#1e6b65]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Institution</label>
                                <input type="text" required value={editData.institution || ""} onChange={e => setEditData({...editData, institution: e.target.value})} className="w-full border p-2 rounded-xl focus:outline-[#1e6b65]" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Experience (Years)</label>
                                <input type="number" required value={editData.experience || 0} onChange={e => setEditData({...editData, experience: e.target.value})} className="w-full border p-2 rounded-xl focus:outline-[#1e6b65]" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-slate-600 mb-1">Location / Details</label>
                                <input type="text" required value={editData.location || ""} onChange={e => setEditData({...editData, location: e.target.value})} className="w-full border p-2 rounded-xl focus:outline-[#1e6b65]" />
                            </div>
                            <div className="sm:col-span-2 text-right pt-2 border-t space-x-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-4 py-2 rounded-xl">Cancel</button>
                                <button type="submit" className="bg-[#1e6b65] hover:bg-[#154d49] text-white font-bold px-5 py-2 rounded-xl shadow-sm">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}