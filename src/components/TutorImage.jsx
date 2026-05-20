"use client"; 

import React, { useState, useEffect } from "react";
import Image from "next/image";

const TutorImage = ({ photoUrl, tutorName, styles, initials }) => {
  const [isError, setIsError] = useState(false);
  const [finalSrc, setFinalSrc] = useState("");

  useEffect(() => {
    if (!photoUrl) {
      setIsError(true);
      return;
    }

    let url = photoUrl.trim();
    setIsError(false); // নতুন URL আসলে এরর স্টেট রিসেট করুন

    // ImgBB এর যেকোনো সাধারণ পেজ লিংক হ্যান্ডেল করার লজিক
    if (url.includes("ibb.co") && !url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      // ট্রেইলিং স্লাশ (/) এবং কুয়েরি প্যারামিটার থাকলে তা রিমুভ করা
      const cleanUrl = url.split("?")[0].replace(/\/$/, "");
      const urlParts = cleanUrl.split("/");
      const imageId = urlParts[urlParts.length - 1];

      if (imageId) {
        // নোট: i.ibb.co ডোমেনে সরাসরি ছবির আসল নাম না দিলে অনেক সময় 404 আসে।
        // যদি কাজ না করে, সমাধান ২ (Direct Link) ব্যবহার করাই ১০০% নিরাপদ।
        url = `https://i.ibb.co/${imageId}/image.png`;
      }
    }

    setFinalSrc(url);
  }, [photoUrl]);

  const hasImage = finalSrc && !isError;

  return (
    <>
      {hasImage && (
        <Image
          src={finalSrc}
          alt={tutorName || "Tutor"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top z-10 bg-white group-hover:scale-105 transition-transform duration-300"
          priority={false}
          unoptimized
          onError={() => {
            console.log("Image failed to load:", finalSrc);
            setIsError(true);
          }} 
        />
      )}

      {/* ইমেজ লোড না হলে বা এরর হলে এই ইনিশিয়াল নেম লেয়ারটি দেখা যাবে */}
      {!hasImage && (
        <h2 className={`text-4xl font-black tracking-wider ${styles?.text || "text-slate-700"} absolute z-0 select-none`}>
          {initials || "TR"}
        </h2>
      )}
    </>
  );
};

export default TutorImage;