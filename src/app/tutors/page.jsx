"use client";

import React, { useState, useEffect } from "react";
import { Card, Button, Input } from "@heroui/react";
import { Search, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        //const serverUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`);
        const data = await res.json();
        setTutors(data);
        setFilteredTutors(data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTutors();
  }, []);

  useEffect(() => {
    let updatedList = [...tutors];

    if (searchQuery.trim() !== "") {
      updatedList = updatedList.filter((tutor) =>
        tutor.tutorName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
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
        return {
          bg: "bg-[#eefcf7]",
          text: "text-[#1e6b65]",
          badgeBg: "bg-[#e0f7f0]",
          badgeText: "text-[#1e6b65]",
        };
      case "offline":
        return {
          bg: "bg-[#edf4fc]",
          text: "text-[#2b6cb0]",
          badgeBg: "bg-[#e1eefc]",
          badgeText: "text-[#2b6cb0]",
        };
      case "both":
        return {
          bg: "bg-[#fdf6ed]",
          text: "text-[#b7791f]",
          badgeBg: "bg-[#fbeed9]",
          badgeText: "text-[#b7791f]",
        };
      default:
        return {
          bg: "bg-slate-50",
          text: "text-slate-700",
          badgeBg: "bg-slate-200",
          badgeText: "text-slate-700",
        };
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1e6b65]">Find a Tutor</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-2 rounded-xl shadow-sm border border-slate-100">
        <div className="w-full md:w-1/3 relative flex items-center">
          <Search
            size={18}
            className="absolute left-3 text-slate-400 pointer-events-none z-10"
          />
          <Input
            placeholder="Search by tutor name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>

        <div className="w-full md:w-1/5">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="w-full md:w-1/5">
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full"
          />
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
            <option value="Bengali">Bengali</option>
            <option value="ICT">ICT</option>
            <option value="Accounting">Accounting</option>
            <option value="Finance">Finance & Banking</option>
          </select>
        </div>
      </div>

      
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 animate-pulse">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="border border-slate-100 rounded-2xl overflow-hidden bg-white p-5 space-y-4 shadow-sm"
            >
              
              <div className="h-48 w-full bg-slate-100 rounded-xl" />
              
              <div className="space-y-2">
                <div className="h-5 bg-slate-200 rounded-md w-2/3" />
                <div className="h-4 bg-slate-100 rounded-md w-1/3" />
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-slate-100 rounded-md w-full" />
                <div className="h-3 bg-slate-100 rounded-md w-5/6" />
                <div className="h-3 bg-slate-100 rounded-md w-4/5" />
              </div>
              <hr className="border-slate-100" />
             
              <div className="flex justify-between items-center pt-1">
                <div className="space-y-1">
                  <div className="h-4 bg-slate-200 rounded-md w-16" />
                  <div className="h-3 bg-slate-100 rounded-md w-12" />
                </div>
                <div className="h-8 bg-slate-200 rounded-xl w-24" />
              </div>
            </div>
          ))}
        </div>
      )}

 
      {!isLoading && filteredTutors.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto space-y-5">
          
          <div className="relative w-24 h-24 bg-[#eefcf7] text-[#1e6b65] rounded-full flex items-center justify-center shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 stroke-[1.5] animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z"
              />
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border border-slate-100 shadow-sm text-amber-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h-2v-2h6v2h-2v2zm0-5h-2V7h2v5z" />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">
              No Tutors Found
            </h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed px-4">
              We couldn't find any tutors matching your exact filter
              combination. Try changing the subject or widening your location
              area.
            </p>
          </div>

          
          <button
            onClick={() => window.location.reload()}
            className="mt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-[#1e6b65] text-white px-5 py-2.5 rounded-xl hover:bg-[#164e4a] transition-all shadow-sm active:scale-95"
          >
            Reset Filters
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isLoading &&
          filteredTutors.map((tutor) => {
            const styles = getBadgeStyles(tutor.teachingMode);

            return (
              <Card
                key={tutor._id}
                className="border border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all group"
              >
                <div className="h-52 w-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
                  {tutor.photoUrl
                    ? (() => {
                        let finalSrc = tutor.photoUrl;

                        if (
                          finalSrc.includes("ibb.co") &&
                          !finalSrc.match(/\.(jpeg|jpg|gif|png|webp)$/i)
                        ) {
                          const urlParts = finalSrc.split("/");
                          const imageId =
                            urlParts[urlParts.length - 1] ||
                            urlParts[urlParts.length - 2];

                          finalSrc = `https://i.ibb.co/${imageId}/image.png`;
                        }

                        return (
                          <Image
                            src={finalSrc}
                            alt={tutor.tutorName}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-top z-10 bg-white group-hover:scale-105 transition-transform duration-300"
                            priority={false}
                            unoptimized
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallbackText = e.currentTarget.nextSibling;
                              if (fallbackText)
                                fallbackText.style.display = "block";
                            }}
                          />
                        );
                      })()
                    : null}

                  <h2
                    style={{ display: tutor.photoUrl ? "none" : "block" }}
                    className={`text-4xl font-black tracking-wider ${styles.text} absolute z-0 select-none`}
                  >
                    {getInitials(tutor.tutorName)}
                  </h2>

                  <span
                    className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full z-20 ${styles.badgeBg} ${styles.badgeText} shadow-sm`}
                  >
                    {tutor.teachingMode}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-800">
                      {tutor.tutorName}
                    </h3>
                    <span className="inline-block mt-0.5 text-[10px] font-bold text-[#1e6b65] bg-[#e0f7f0] px-2 py-0.5 rounded-full">
                      {tutor.subject}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <MapPin size={12} className="text-slate-400" />
                    <span>
                      {tutor.location
                        ? tutor.location.split(",")[0]
                        : "Not Specified"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <div>
                      <p className="text-[#1e6b65] font-extrabold text-base">
                        ৳{tutor.hourlyFee}
                        <span className="text-[11px] font-medium text-slate-400">
                          {" "}
                          /hr
                        </span>
                      </p>
                      {tutor.totalSlots !== undefined && (
                        <p className="text-[10px] text-slate-400 font-medium">
                          {tutor.totalSlots} slots left
                        </p>
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
    </div>
  );
};

export default Page;