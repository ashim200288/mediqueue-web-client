"use client"

import React, { useState } from 'react';
import { FieldError, Input, Label, TextField, Select, ListBox, Button, Card } from "@heroui/react";

const AddTutors = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const tutorData = Object.fromEntries(formData.entries());


        tutorData.hourlyFee = Number(tutorData.hourlyFee);
        tutorData.totalSlots = Number(tutorData.totalSlots);
        tutorData.experience = Number(tutorData.experience);

        console.log("Submitting Tutor Data:", tutorData);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(tutorData)
            });

            const data = await res.json();
            if (res.ok) {
                alert("Tutor added successfully!");
                e.target.reset();
            } else {
                alert("Failed to add tutor");
            }
        } catch (err) {
            console.error("Error submitting data:", err);
            alert("Server network error!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-5 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-[#1e6b65] mb-6">Add New Tutor</h1>

            <Card className="border border-slate-100 shadow-sm rounded-xl">
                <form onSubmit={onSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Tutor Name */}
                        <TextField name="tutorName" isRequired>
                            <Label className="text-sm font-medium text-slate-700">Tutor Name</Label>
                            <Input placeholder="Full name" className="rounded-lg border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Photo URL */}
                        <TextField name="photoUrl" type="url" isRequired>
                            <Label className="text-sm font-medium text-slate-700">Photo URL</Label>
                            <Input placeholder="imgbb link..." className="rounded-lg border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Subject / Category Dropdown */}
                        <div>
                            <Select name="subject" isRequired className="w-full" placeholder="Select Subject">
                                <Label className="text-sm font-medium text-slate-700">Subject / Category</Label>
                                <Select.Trigger className="rounded-lg border-slate-200">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Mathematics" textValue="Mathematics">Mathematics</ListBox.Item>
                                        <ListBox.Item id="Physics" textValue="Physics">Physics</ListBox.Item>
                                        <ListBox.Item id="Chemistry" textValue="Chemistry">Chemistry</ListBox.Item>
                                        <ListBox.Item id="Biology" textValue="Biology">Biology</ListBox.Item>
                                        <ListBox.Item id="English" textValue="English">English</ListBox.Item>

                                        <ListBox.Item id="Higher Mathematics" textValue="Higher Mathematics">Higher Mathematics</ListBox.Item>
                                        <ListBox.Item id="ICT" textValue="ICT">ICT (Information & Communication Technology)</ListBox.Item>
                                        <ListBox.Item id="Bangla" textValue="Bangla">Bangla</ListBox.Item>
                                        <ListBox.Item id="Accounting" textValue="Accounting">Accounting</ListBox.Item>
                                        <ListBox.Item id="Finance" textValue="Finance">Finance & Banking</ListBox.Item>
                                        <ListBox.Item id="Management" textValue="Management">Business Organization & Management</ListBox.Item>
                                        <ListBox.Item id="Economics" textValue="Economics">Economics</ListBox.Item>
                                        <ListBox.Item id="General Science" textValue="General Science">General Science</ListBox.Item>
                                        <ListBox.Item id="History" textValue="History">History</ListBox.Item>
                                        <ListBox.Item id="Geography" textValue="Geography">Geography & Environment</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Teaching Mode Dropdown */}
                        <div>
                            <Select name="teachingMode" isRequired className="w-full" placeholder="Select Mode">
                                <Label className="text-sm font-medium text-slate-700">Teaching Mode</Label>
                                <Select.Trigger className="rounded-lg border-slate-200">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Online" textValue="Online">Online</ListBox.Item>
                                        <ListBox.Item id="Offline" textValue="Offline">Offline</ListBox.Item>
                                        <ListBox.Item id="Both" textValue="Both">Both</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Available Days & Time */}
                        <TextField name="availableSchedule" isRequired>
                            <Label className="text-sm font-medium text-slate-700">Available Days & Time</Label>
                            <Input placeholder="e.g. Sun–Thu 5:00–8:00 PM" className="rounded-lg border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Hourly Fee */}
                        <TextField name="hourlyFee" type="number" isRequired>
                            <Label className="text-sm font-medium text-slate-700">Hourly Fee (৳)</Label>
                            <Input placeholder="500" type="number" className="rounded-lg border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Total Slots */}
                        <TextField name="totalSlots" type="number" isRequired>
                            <Label className="text-sm font-medium text-slate-700">Total Slots</Label>
                            <Input placeholder="20" type="number" className="rounded-lg border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Session Start Date */}
                        <TextField name="startDate" type="date" isRequired>
                            <Label className="text-sm font-medium text-slate-700">Session Start Date</Label>
                            <Input type="date" className="rounded-lg border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Institution */}
                        <TextField name="institution" isRequired>
                            <Label className="text-sm font-medium text-slate-700">Institution</Label>
                            <Input placeholder="University / College name" className="rounded-lg border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Experience */}
                        <TextField name="experience" type="number" isRequired>
                            <Label className="text-sm font-medium text-slate-700">Experience (years)</Label>
                            <Input placeholder="3" type="number" className="rounded-lg border-slate-200" />
                            <FieldError />
                        </TextField>

                        {/* Location */}
                        <div className="md:col-span-2">
                            <TextField name="location" isRequired>
                                <Label className="text-sm font-medium text-slate-700">Location (Area/City)</Label>
                                <Input placeholder="e.g. Mirpur, Dhaka" className="rounded-lg border-slate-200" />
                                <FieldError />
                            </TextField>
                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            isLoading={isLoading}
                            className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium rounded-lg text-sm transition-all focus:outline-none shadow-sm"
                        >
                            Submit Tutor
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddTutors;