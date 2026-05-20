"use client";

import React, { useState, useEffect } from "react";
import { Card, Button, Input } from "@heroui/react";
import { Search, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
    const [tutors, setTutors] = useState([]);
    const [filteredTutors, setFilteredTutors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All Subjects");

    // Modal States for Add / Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTutor, setEditingTutor] = useState(null); // null means "Add Mode", object means "Edit Mode"

    // Form States
    const [formData, setFormData] = useState({
        tutorName: "",
        subject: "Mathematics",
        teachingMode: "Online",
        location: "",
        hourlyFee: "",
        totalSlots: "",
        photoUrl: ""
    });

    const serverUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    // Fetch Tutors
    const fetchTutors = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${serverUrl}/tutors`);
            const data = await res.json();
            setTutors(data);
            setFilteredTutors(data);
        } catch (error) {
            console.error("Error fetching tutors:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTutors();
    }, []);

    // Filter logic
    useEffect(() => {
        let updatedList = [...tutors];

        if (searchQuery.trim() !== "") {
            updatedList = updatedList.filter((tutor) => {
                const name = tutor.tutorName || tutor.name || "";
                return name.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }

        if (selectedSubject !== "All Subjects" && selectedSubject !== "") {
            updatedList = updatedList.filter(
                (tutor) => tutor.subject === selectedSubject,
            );
        }

        if (startDate) {
            updatedList = updatedList.filter(
                (tutor) => new Date(tutor.startDate) >= new Date(startDate),
            );
        }
        if (endDate) {
            updatedList = updatedList.filter(
                (tutor) => new Date(tutor.startDate) <= new Date(endDate),
            );
        }

        setFilteredTutors(updatedList);
    }, [searchQuery, selectedSubject, startDate, endDate, tutors]);

    // Open Modal Helper
    const openModal = (tutor = null) => {
        if (tutor) {
            setEditingTutor(tutor);
            setFormData({
                tutorName: tutor.tutorName || tutor.name || "",
                subject: tutor.subject || "Mathematics",
                teachingMode: tutor.teachingMode || "Online",
                location: tutor.location || "",
                hourlyFee: tutor.hourlyFee || "",
                totalSlots: tutor.totalSlots || "",
                photoUrl: tutor.photoUrl || ""
            });
        } else {
            setEditingTutor(null);
            setFormData({
                tutorName: "",
                subject: "Mathematics",
                teachingMode: "Online",
                location: "",
                hourlyFee: "",
                totalSlots: "",
                photoUrl: ""
            });
        }
        setIsModalOpen(true);
    };

    // Create or Update Handler
    const handleSaveTutor = async (e) => {
        e.preventDefault();
        const url = editingTutor ? `${serverUrl}/tutors/${editingTutor._id}` : `${serverUrl}/tutors`;
        const method = editingTutor ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchTutors(); // Refresh list automatically
            }
        } catch (error) {
            console.error("Error saving tutor profile:", error);
        }
    };

    // Delete Handler
    const handleDeleteTutor = async (id) => {
        if (!window.confirm("Are you sure you want to delete this tutor profile?")) return;

        try {
            const res = await fetch(`${serverUrl}/tutors/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setTutors(tutors.filter(t => t._id !== id));
            }
        } catch (error) {
            console.error("Error deleting tutor profile:", error);
        }
    };

    const getInitials = (name) => {
        if (!name) return "TR";
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const getBadgeStyles = (mode) => {
        switch (mode?.toLowerCase()) {
            case "online":
                return { bg: "bg-[#eefcf7]", text: "text-[#1e6b65]", badgeBg: "bg-[#e0f7f0]", badgeText: "text-[#1e6b65]" };
            case "offline":
                return { bg: "bg-[#edf4fc]", text: "text-[#2b6cb0]", badgeBg: "bg-[#e1eefc]", badgeText: "text-[#2b6cb0]" };
            case "both":
                return { bg: "bg-[#fdf6ed]", text: "text-[#b7791f]", badgeBg: "bg-[#fbeed9]", badgeText: "text-[#b7791f]" };
            default:
                return { bg: "bg-slate-50", text: "text-slate-700", badgeBg: "bg-slate-200", badgeText: "text-slate-700" };
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#1e6b65]">Find a Tutor</h1>
                    <p className="text-xs text-slate-400 mt-1">Manage and search active assignments</p>
                </div>

            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                <div className="w-full md:w-1/3 relative flex items-center">
                    <Search size={18} className="absolute left-3 text-slate-400 pointer-events-none z-10" />
                    <Input
                        placeholder="Search by tutor name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10"
                    />
                </div>

                <div className="w-full md:w-1/5">
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full" />
                </div>

                <div className="w-full md:w-1/5">
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full" />
                </div>

                <div className="w-full md:w-1/4">
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-transparent rounded-xl text-sm font-medium transition-all focus:outline-none cursor-pointer"
                    >
                        <option value="All Subjects">All Subjects</option>
                        <option value="Science">Science (General)</option>
                        <option value="Commerce">Commerce / Business Studies</option>
                        <option value="Arts">Arts / Humanities</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Higher Mathematics">Higher Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="English">English</option>
                        <option value="ICT">ICT (Information & Communication Technology)</option>
                        <option value="Bangla">Bangla</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Finance">Finance & Banking</option>
                        <option value="Management">Business Organization & Management</option>
                        <option value="Economics">Economics</option>
                        <option value="General Science">General Science</option>
                        <option value="History">History</option>
                        <option value="Geography">Geography & Environment</option>
                    </select>
                </div>
            </div>

            {/* Loading Skeleton */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 animate-pulse">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="border border-slate-100 rounded-2xl bg-white p-5 space-y-4 shadow-sm">
                            <div className="h-48 w-full bg-slate-100 rounded-xl" />
                            <div className="h-5 bg-slate-200 rounded-md w-2/3" />
                            <div className="h-3 bg-slate-100 rounded-md w-full" />
                            <div className="flex justify-between items-center pt-2">
                                <div className="h-4 bg-slate-200 rounded-md w-16" />
                                <div className="h-8 bg-slate-200 rounded-xl w-24" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredTutors.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto space-y-5">
                    <h3 className="text-xl font-bold text-slate-800">No Tutors Found</h3>
                    <p className="text-sm text-slate-400">Try changing your filter values or add a new record.</p>
                </div>
            )}

            {/* Main Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!isLoading &&
                    filteredTutors.map((tutor) => {
                        const styles = getBadgeStyles(tutor.teachingMode);
                        const displayName = tutor.tutorName || tutor.name || "Unknown Tutor";
                        const displayFee = tutor.hourlyFee || tutor.fee || "0";

                        return (
                            <Card key={tutor._id} className="border border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all group relative">

                                {/* Administrative Edit / Delete Floating Action Layer */}
                                <div className="absolute top-3 left-3 z-30 flex gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => openModal(tutor)}
                                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-white shadow-sm transition-all"
                                        title="Edit Tutor Profile"
                                    >
                                        <Edit size={13} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTutor(tutor._id)}
                                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-white shadow-sm transition-all"
                                        title="Delete Profile"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>

                                {/* Banner / Photo Frame */}
                                <div className="h-52 w-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
                                    {tutor.photoUrl ? (
                                        <Image
                                            src={tutor.photoUrl}
                                            alt={displayName}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover object-top z-10 bg-white group-hover:scale-105 transition-transform duration-300"
                                            unoptimized
                                        />
                                    ) : null}

                                    <h2 className={`text-4xl font-black tracking-wider ${styles.text} absolute z-0 select-none`}>
                                        {getInitials(displayName)}
                                    </h2>

                                    <span className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full z-20 ${styles.badgeBg} ${styles.badgeText} shadow-sm`}>
                                        {tutor.teachingMode || "Online"}
                                    </span>
                                </div>

                                {/* Content Details block */}
                                <div className="p-5 space-y-3">
                                    <div>
                                        <h3 className="text-base font-bold text-slate-800 line-clamp-1">{displayName}</h3>
                                        <span className="inline-block mt-0.5 text-[10px] font-bold text-[#1e6b65] bg-[#e0f7f0] px-2 py-0.5 rounded-full">
                                            {tutor.subject}
                                        </span>
                                    </div>

                                    <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                        <MapPin size={12} className="text-slate-400" />
                                        <span>{tutor.location ? tutor.location.split(",")[0] : "Remote / Not Specified"}</span>
                                    </div>

                                    {/* Pricing and Action Strip */}
                                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                        <div>
                                            <p className="text-[#1e6b65] font-extrabold text-base">
                                                ৳{displayFee} <span className="text-[11px] font-medium text-slate-400">/hr</span>
                                            </p>
                                            {tutor.totalSlots !== undefined && (
                                                <p className="text-[10px] text-slate-400 font-medium">{tutor.totalSlots} slots remaining</p>
                                            )}
                                        </div>

                                        <Link href={`/tutors/${tutor?._id}`}>
                                            <Button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs px-4 py-1.5 rounded-xl transition-all shadow-sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
            </div>

            {/* Unified Add / Edit Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                            <h2 className="text-lg font-bold text-slate-800">
                                {editingTutor ? "Modify Tutor Profile" : "Create New Profile"}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 font-semibold text-sm"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSaveTutor} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 block mb-1">Tutor Full Name</label>
                                <Input
                                    required
                                    placeholder="e.g. Rahat Khan"
                                    value={formData.tutorName}
                                    onChange={(e) => setFormData({ ...formData, tutorName: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 block mb-1">Subject specialty</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full p-2 border border-slate-200 rounded-xl text-sm font-medium bg-slate-50 focus:outline-none"
                                    >
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Chemistry">Chemistry</option>
                                        <option value="English">English</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 block mb-1">Teaching Medium</label>
                                    <select
                                        value={formData.teachingMode}
                                        onChange={(e) => setFormData({ ...formData, teachingMode: e.target.value })}
                                        className="w-full p-2 border border-slate-200 rounded-xl text-sm font-medium bg-slate-50 focus:outline-none"
                                    >
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                        <option value="Both">Both</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 block mb-1">Hourly Fee (৳)</label>
                                    <Input
                                        required
                                        type="number"
                                        placeholder="500"
                                        value={formData.hourlyFee}
                                        onChange={(e) => setFormData({ ...formData, hourlyFee: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 block mb-1">Available Slots</label>
                                    <Input
                                        type="number"
                                        placeholder="3"
                                        value={formData.totalSlots}
                                        onChange={(e) => setFormData({ ...formData, totalSlots: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 block mb-1">Location / City Area</label>
                                <Input
                                    placeholder="e.g. Dhanmondi, Dhaka"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 block mb-1">Profile Photo Image URL</label>
                                <Input
                                    placeholder="https://example.com/photo.jpg"
                                    value={formData.photoUrl}
                                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                                <Button
                                    type="button"
                                    variant="light"
                                    onClick={() => setIsModalOpen(false)}
                                    className="font-bold text-xs"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#1e6b65] text-white font-bold text-xs rounded-xl"
                                >
                                    {editingTutor ? "Save Changes" : "Create Profile"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;