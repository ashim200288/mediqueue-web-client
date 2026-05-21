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
    setIsError(false); 

    if (url.includes("ibb.co") && !url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      
      const cleanUrl = url.split("?")[0].replace(/\/$/, "");
      const urlParts = cleanUrl.split("/");
      const imageId = urlParts[urlParts.length - 1];

      if (imageId) {
       
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

      {!hasImage && (
        <h2 className={`text-4xl font-black tracking-wider ${styles?.text || "text-slate-700"} absolute z-0 select-none`}>
          {initials || "TR"}
        </h2>
      )}
    </>
  );
};

export default TutorImage;